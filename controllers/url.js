const map = new Map();
const PORT = process.env.PORT;


function generate_shorturl(long_url, length) {
    const dict = "abcdefghijklmnopqrstuvwxyz1234567890";
    let res = "";
    
    for(let i=0; i<length; i++) {
        const index = Math.floor(Math.random() * dict.length);
        res += dict[index];
    }

    map.set(res, long_url);
    
    return res;
}




function short_url(req, res) {
    const { long_url } = req.body;
    
    try {
        const gen_size = 5;
        const short_code = generate_shorturl(long_url, gen_size);

        res.status(200).json({
            success: true,
            message: "long url shortened",
            short_url: `http://localhost:${PORT}/${short_code}`
        });
        
    }catch(err){
        console.error("Error: ", err);
        res.status(500).json({ error: "Internal server error" });
    }
}


function redirect_url(req, res) {
    const code = req.params.code;
    const long_url = map.get(code);

    if(long_url){
        res.redirect(long_url);
    } else {
        res.status(400).json({ error: "short url not found!" });
    }
}



module.exports = {
    short_url,
    redirect_url
};
