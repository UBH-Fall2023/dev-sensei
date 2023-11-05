import os
import openai
from flask import Flask
from flask import request, jsonify, Response
import json
import base64

import requests, io
from PIL import Image


openai.organization = "org-hmLTnmUwpQ26fR7nqDqxWwVq"
openai.api_key = "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"#os.getenv("OPENAI_API_KEY")

app = Flask(__name__)
# json="Give an answer in json format. The json string should have a key Actionable_Steps with value as json object list. Each object in the list is one step and include the step number, category, tasks, team positions , resources."
# prefix= "Act like a venture coach and mentor and give me actionable steps with points to build my start from scratch which is "
# suffix= " Give an answer in json format and also give me Resources in the Niagara Falls and Buffalo Area. I also need different positions I would need in my team for each step."
prefix ="Provide system design with all the techstack, tools and technologies required and why it is required in brief. also provide reason in brief for your choice making sure the system is highly scalable, reliable and available. send it as a json with list of components. where for each component as key \"component\" value is component name, give its technology options as key \"technology\" value as list of technologies and then its justifications with key as \"justifications\" values as justification for each technology. Also give resources for each technologies and tools as list where key is 'resources'. Also give summary of how the entire system will work and save it as string value in key \"summary\". The software design topic is: "

prefix2 = "Generate a architectural diagram with all the relevant components using mermaid format. Return json format with key as \"design\" and value as the format generated and the given usecase: "

plan_json = None

def render(graph):
    graphbytes = graph.encode("ascii")
    base64_bytes = base64.b64encode(graphbytes)
    base64_string = base64_bytes.decode("ascii")
    img = io.BytesIO(requests.get('https://mermaid.ink/img/' + base64_string).content)
    encoded_string = base64.b64encode(by.getvalue())
    return base64_string

@app.route('/diagram',methods=['POST'])
def diagram():
    data = request.json
    print(data)
    prompt = data['diagram']
    print(prompt)
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo-16k",
        messages=[
            {"role": "user", "content": prefix2+prompt}
        ]
    )
    plan_json = json.loads(response['choices'][0]['message']['content'])
    base64_str = render(plan_json)
    out = f"\{'design':{base64_str}\}"
    print(plan_json)
    
    return out

@app.route('/design',methods=['POST'])
def bplan():
    data = request.json
    print(data)
    prompt = data['prompt']
    print(prompt)
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo-16k",
        messages=[
            {"role": "user", "content": prefix+prompt}
        ]
    )
    plan_json = response['choices'][0]['message']['content']
    print(plan_json)
    response = Response(status=200, response=plan_json)
    return plan_json

@app.route('/design',methods=['GET'])
def getbplan():
    if plan_json:
        return jsonify(plan_json)
    else:
        return jsonify("{'error':-1")



# # main driver function
if __name__ == '__main__':

    # run() method of Flask class runs the application
    # on the local development server.
    app.run(debug = True)


# prompt="By 2026, more than 217 million people in the U.S. will use online food delivery services. Tap into that market and start a meal-prep service to make people’s lives easier and cater to specialized diets (keto, vegan, Whole30)."
# prompt="Act like a venture coach and mentor and give me actionable steps and elaborate tasks in each step to launch my startup and also give me multiple resources like organisations, business development centers,  who can help me for each step around Niagara Falls, Buffalo. My idea is \"to sell authentic Kerela banana chips to the world cooked in fresh peanut oil with authentic spices\”."
# prompt_working = "Act like a venture coach and mentor and give me elaborated actionable steps for my startup and also give me resources like organisations, funds, etc. who can help me for each step located around Niagara Falls, Buffalo. Start up idea is \"to sell authentic Kerela banana chips to the world cooked in fresh peanut oil with authentic spices\”. Give an answer in json format and also give me Resources in the Niagara Falls and Buffalo Area. I also need different positions I would need in my team for each step.Give an answer in json format which includes the step number, category, tasks, team positions, resources (provide website links if possible)."
# prefix = "Act like a venture coach and mentor and give me elaborated actionable 8 steps to launch my startup from zero to one and also give me resources like organisations, funds, etc. who can help me for each step located around Niagara Falls, Buffalo. Start up idea is to "
# suffix = "Give an answer in json format and also give me Resources in the Niagara Falls and Buffalo Area. I also need different positions I would need in my team for each step.Give an answer in json format which includes the step number, category, tasks, team positions, resources (provide website links if possible)."
#  print(prefix+prompt+suffix+json)
# multiple elaborated tasks, team positions, resources like organizations, funds to help me in each step located around Niagara Falls, Buffalo (provide website links if possible) for my startup. Start up idea is to sell authentic Kerela banana chips to the world cooked in fresh peanut oil with authentic spices. Give an answer in json format and also give me resources including startup incubators and funding in the Niagara Falls and Buffalo Area.
# prompt = "Act like a venture coach and give me 8 actionable steps in json format which includes the step number, category, "

prompt = "I want to build a tinder like platform."
# prefix_final = "Act like a venture coach and give me 8 actionable steps in json format which includes the step number, category, multiple elaborated tasks, team positions, resources like organizations, funds to help me in each step located around Niagara Falls, Buffalo (provide website links if possible) for my startup. Start up idea is to "
# prompt = "By 2026, more than 217 million people in the U.S. will use online food delivery services. Tap into that market and start a meal-prep service to make people’s lives easier and cater to specialized diets (keto, vegan, Whole30)."


# response = openai.ChatCompletion.create(
#         model="gpt-3.5-turbo-16k",
#         messages=[
#             {"role": "user", "content": prefix+prompt}
#         ]
#     )
# print(response['choices'][0]['message']['content'])
