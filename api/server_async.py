from aiohttp import web
import docker

client = docker.APIClient()

methods = {
    "POST" : client._post,
    "GET" : client._get 
}


async def handle(request):
    if request.match_info['path'] == request.match_info['path'].lstrip("/"):
        method = methods.get(request.method, None)
        if method is None: return web.Response(status=404)
        try :        
            return web.json_response(client._result(method(client._url(("/" + request.match_info['path'].lstrip("/")))), True))
        except docker.errors.NotFound as e: return web.Response(status=404)
    else: return web.Response(status=404)
            
    

app = web.Application()
app.add_routes([web.route('*',"/{path:.*}", handle)])

if __name__ == '__main__':
    web.run_app(app, port=5000)