use Rack::Static , :urls => { 
    "/" => "index.html", 
    "/index.html" => "index.html", 
    } , :root => "public"

run Rack::URLMap.new({
  "/"      => Rack::Directory.new("public"),
})
