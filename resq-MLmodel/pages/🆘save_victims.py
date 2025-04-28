import streamlit as st
import base64
import supervision as sv
from inference_sdk import InferenceHTTPClient
from PIL import Image, ImageDraw, ImageOps

def detectVictim(api_key, image):
    size = (640,640)    
    image = ImageOps.fit(image, size)
    try:
        CLIENT = InferenceHTTPClient(
            api_url="https://detect.roboflow.com",
            api_key=api_key
        )
        result = CLIENT.infer(image, model_id="yolo-floods-relief/4")
        if 'predictions' in result:
            return result['predictions']
        else:
            st.error("Failed to get predictions from the model.")
            return None
    except Exception as e:
        if "403 Client Error: Forbidden" in str(e):
            st.error("Invalid API Key. Please check your API key and try again.")
        else:
            st.error(f"An error occurred: {e}")
        return None
    
def detectWaterLevel(api_key,image):
    size = (640,640)    
    image = ImageOps.fit(image, size)
    try:
        CLIENT = InferenceHTTPClient(
            api_url="https://detect.roboflow.com",
            api_key=api_key
        )
        result = CLIENT.infer(image, model_id="water-level-sindh/6")
        if 'predictions' in result:
            return result['predictions']
        else:
            st.error("Failed to get predictions from the model.")
            return None
    except Exception as e:
        if "403 Client Error: Forbidden" in str(e):
            st.error("Invalid API Key. Please check your API key and try again.")
        else:
            st.error(f"An error occurred: {e}")
        return None

def draw_bounding_box(image, predictions):
    draw = ImageDraw.Draw(image)
    for prediction in predictions:
        x = prediction['x']-40
        y = prediction['y']-120
        width = prediction['width']
        height = prediction['height']
        draw.rectangle([x, y, x+width, y+height], outline="red", width=3)
        draw.text((x, y), prediction['class'], fill="yellow")

def main():
  st.set_page_config(page_title="Save Victims", page_icon="🆘",initial_sidebar_state='expanded')

  st.title("Save Flood Victims 🆘")
  st.subheader("Flood victims dected by our model")

  higherClass=['level4', 'level 5','level 6', 'level 7', 'level 8', 'level 9', 'level 10', 'level 11', 'level 12']

  api_key = st.text_input("Enter API Key", type='password')
  uploaded_file = st.file_uploader("Choose an image...", type=["jpg", "png", "jpeg"])
  
  if uploaded_file is not None:
     if api_key is not None:
         image = Image.open(uploaded_file)
         size = (640,640)
         image = ImageOps.fit(image, size)
         victim_predictions=detectVictim(api_key,image)
         level_predictions=detectWaterLevel(api_key,image)

         if victim_predictions:
          person = 0
          animal=0
          
          for detection in victim_predictions:
                if detection['class'] == 'person':
                    person += 1
                elif detection['class'] == 'animal':
                    animal+=1
          draw_bounding_box(image, victim_predictions)
          st.image(image, caption='Processed Image', use_column_width=True)
          st.divider()
          st.write(f"**Persons detected: {person}**")
          st.write(f"**Animals detected: {animal}**")
          st.divider()
         if level_predictions:
          # Simplified logic to show flood level
          found_level = False
          flood_detected = False
          
          # Process all predictions to determine status
          high_levels = []
          low_levels = []
          
          for entity in level_predictions:
              level_class = entity['class']
              
              if level_class in higherClass:
                  high_levels.append(level_class)
              elif level_class.startswith('level'):
                  low_levels.append(level_class)
              elif level_class == 'flood':
                  flood_detected = True
          
          # Display results with priority (high levels first, then low, then general flood)
          if high_levels:
              st.subheader(f"High level of Flood Detected: :red[{high_levels[0]}]")
              found_level = True
          elif low_levels:
              st.subheader(f"Low Flood levels detected: :green[{low_levels[0]}]")
              found_level = True
          elif flood_detected:
              st.subheader("**Flood is detected**")
     else:
        st.error("Add Valid Roboflow API Key")


if __name__ == "__main__":
    main()

