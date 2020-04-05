'''
	durante a semana omnistack tive problemas com a instalação do insomnia
	os AURS e Snap packages estavam quebrados, como solução desenvolvi
	o script abaixo para que eu consiga testar o funcionamento da API
	e enfim terminar a semana com sucesso
	embora o projeto seja em node, o script é em python por meu costume com a linguagem
	não está modularizado, nao está orientado a objetos, o objetivo era simples, criar um script
	para testar a API do projeto
'''

import requests
import json

def req(_type,controller):
	dados= {
		"ongs" : {
			"name" : "APAD",
			"email" : "contato@apad.com.br",
			"whatsapp" : "47000000000",
			"city" : "Barbacena",
			"uf" : "MG"
			},
		'incidents': {
			"title":"teste",
			"description" : "testando",
			"value" : "vamola"
			},
		'sessions': {
			"id" : "f5a15f68",
		}
	}

	headers = {
		'Content-Type' : 'application/json',
		'Authorization': 'e465fde1'
	}


	if _type == 'get':
		url = f"http://localhost:3333/{controller}/"
		if controller == 'profile':
			x = requests.get(url, headers=headers)
		elif controller == 'incidents':
			url = f"http://localhost:3333/{controller}?page"
			x = requests.get(url, headers=headers)
		else:
			x = requests.get(url)
	if _type == 'post':
		url = f"http://localhost:3333/{controller}"
		if controller == 'incidents':
			x = requests.post(url, json=dados[f'{controller}'], headers=headers)
		if controller == 'profile':
			x = requests.post(url, headers=headers)
		if controller == 'ongs':
			x = requests.post(url, json=dados[f'{controller}'], headers=headers)
		if controller == 'sessions':
			x = requests.post(url, json=dados[f'{controller}'])

	if _type == 'delete':
		_id = input('Qual deseja deletar? ')
		url = f"http://localhost:3333/{controller}/{_id}"
		x = requests.delete(url, headers=headers)
	return x.text, x.headers


def menu():
	_type = input('Qual o tipo da requisiçao? ')
	controller = input('Qual controller? ')
	text,header = req(_type, controller)
	print(f"""
						Request
		{'*' * 40}
		{text}
		{'*'*40}
						Header
		{header}
		{'*'*40}
	
	""")


if __name__ == "__main__":
	menu()
