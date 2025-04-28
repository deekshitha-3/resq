import streamlit as st
import base64
import supervision as sv
from inference_sdk import InferenceHTTPClient
from PIL import Image, ImageDraw, ImageOps


st.set_page_config(page_title="ResQ", page_icon="🤝",initial_sidebar_state='expanded')
@st.cache_data
def showGif():
    file_ = open("./assets/resq.gif", "rb")
    contents = file_.read()
    data_url = base64.b64encode(contents).decode("utf-8")
    file_.close()
    st.markdown(
            f'<div style="display: flex; justify-content: center;"><img src="data:image/gif;base64,{data_url}" alt="Sahayta"></div>',
            unsafe_allow_html=True,)

st.title("ResQ: Hope in the Darkest Hour🤝")
st.divider()
st.subheader("AIM 🚀")
st.markdown("Enhance disaster relief and response efforts by leveraging satellite imagery during disasters like floods and wildfires, integrating existing geospatial information, and utilizing environmental data for affected regions")
st.divider()
showGif()
st.subheader("Problem Identified")
st.markdown("**👉Floods affected over 43 million people in 2024, with disaster response delays averaging 30 minutes to 4 hours, leading to preventable loss of lives.**")
st.markdown("**👉Wildfires burned  ~8.9 million acres globally in 2024, escalating due to late detection averaging from 3-5 hours.**")
st.divider()
st.subheader("Solution")
st.markdown("**👉Use satellite imagery to detect and monitor disasters in real-time.**")
st.markdown("**👉Use geospatial information to allocate resources and respond to disasters.**")
st.markdown("**👉Our Userfriendly app for people to report disasters and get help: [🔗](https://resq.lovable.app/)**")
