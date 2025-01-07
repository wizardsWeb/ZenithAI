import os
import speech_recognition as sr
import pyttsx3
from langchain.chains import ConversationalRetrievalChain
from langchain_huggingface.embeddings import HuggingFaceEmbeddings
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_groq import ChatGroq
from langchain_community.vectorstores import FAISS
from langchain.memory import ConversationBufferMemory
from langchain_community.document_loaders import TextLoader
from langchain.callbacks.streaming_stdout import StreamingStdOutCallbackHandler
from dotenv import load_dotenv
from langchain.prompts import PromptTemplate
import json


load_dotenv()

def create_conversational_chain(vector_store):
    # Using Groq to call Meta Llama
    llm = ChatGroq(
        model_name="Llama3-8b-8192",
        groq_api_key=os.getenv("GROQ_API"),
        streaming=True,
        callbacks=[StreamingStdOutCallbackHandler()],
        temperature=0.01,
        top_p=1,

    )
    
    memory = ConversationBufferMemory(memory_key="chat_history", return_messages=True)

    chain = ConversationalRetrievalChain.from_llm(
        llm=llm,
        chain_type='stuff',
        retriever=vector_store.as_retriever(search_kwargs={"k": 2}),
        memory=memory,

    )
    return chain

def bot(user_input):
    # Load and split the text
    loader = TextLoader("book\\output.txt")
    text = loader.load()

    text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000,chunk_overlap=200)
    text_chunks = text_splitter.split_documents(text)

    # Create embeddings using Hugging Face
    embeddings = HuggingFaceEmbeddings(
        model_name="sentence-transformers/all-MiniLM-L6-v2", 
        model_kwargs={'device': 'cpu'}
    )

    # Create vector store
    vector_store = FAISS.from_documents(text_chunks, embedding=embeddings)

    # Create the chain object
    chain = create_conversational_chain(vector_store)
    result = chain.invoke({"question": user_input})
    return result

def TextToAudio(st):
    text_to_speech = pyttsx3.init()
    # text_to_speech.save_to_file(st,"audio.mp3")
    
    text_to_speech.say(st)
    text_to_speech.runAndWait()

# recognize speech using Google Speech Recognition
def AudioToText():
    # obtain audio from the microphone
    r = sr.Recognizer()
    with sr.Microphone() as source:
        print("Say something!")
        audio = r.listen(source)
    try:
        # for testing purposes, we're just using the default API key
        # to use another API key, use `r.recognize_google(audio, key="GOOGLE_SPEECH_RECOGNITION_API_KEY")`
        # instead of `r.recognize_google(audio)`
        st = r.recognize_google(audio)
        print("Google Speech Recognition thinks you said : " + st)
        return str(st)
    except sr.UnknownValueError:
        print("Google Speech Recognition could not understand audio")
    except sr.RequestError as e:
        print("Could not request results from Google Speech Recognition service; {0}".format(e))


import google.generativeai as genai

Google_API_Key = os.getenv("GEMINI_API_KEY")
genai.configure(api_key=Google_API_Key)

# Set up the model configuration
generation_config = {
    "temperature": 0.4,
    "top_p": 0.95,
    "top_k": 64,
    "max_output_tokens": 4096,
}

# Initialize Gemini model with the desired configuration
gemini_model = genai.GenerativeModel(
    model_name="gemini-1.5-flash",
    generation_config=generation_config,
)

# Define your prompt template
prompt_template = PromptTemplate(
    input_variables=["questions", "answers"],
    template=(
        "You are a psychologist analyzing responses to a mental health quiz. "
        "Based on the following questions and answers, provide a brief summary "
        "of the person's mental state:\n\n"
        "Questions:\n{questions}\n\n"
        "Answers:\n{answers}\n\n"
        "Summary of mental state:"
    )
)

def analyze_questions(questions, answers):
    # print(questions, answers)
    formatted_questions = "\n".join([f"{i+1}. {q}" for i, q in enumerate(questions)])
    formatted_answers = "\n".join([f"{i+1}. {a}" for i, a in enumerate(answers)])
    # print(formatted_answers, formatted_questions)
    prompt = prompt_template.format(questions=formatted_questions, answers=formatted_answers)
    result = gemini_model.generate_content(prompt)
    # print(prompt)
    return result.text

prompt_template_suggest = PromptTemplate(
    input_variables=["mood", "age"],
    template=(
        '''
 You are a recommendation assistant designed to suggest the perfect content based on a user's mood and age. Provide a list of suggestions in the following categories:
1. Hollywood movies
2. Bollywood movies
3. Uplifting music
4. Other activities or resources (books, games, mindfulness apps, etc.)

Guidelines:
- Tailor recommendations to the user's mood and age.
- Ensure suggestions include a mix of genres and are diverse.
- Suggest movies and music that are widely appreciated and age-appropriate.
- Provide a short description for each suggestion.

User details:
Mood: {mood}
Age: {age}

Structure your response in json:

  "hollywood_movies": list of movies,
  "bollywood_movies": list of movies,
  "uplifting_music": list of music,
  "other_activities": list of activities,
  
'''
    )
)

def generate_suggestions(mood, age):
    # print(mood, age)
    prompt = prompt_template_suggest.format(mood=mood, age=age)
    # need a json result
    result = gemini_model.generate_content(prompt)
    print(result.text)
    return result.text
    # structured_output = json.loads(result.text)
    # return structured_output
    # parse to a json 
    