import json

with open('src/data.json',encoding="UTF-8") as f:
    data = json.load(f)

print(type(str(data)))