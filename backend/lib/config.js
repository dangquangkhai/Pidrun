email_server = {
    host: "smtp.gmail.com",
    port: 465,
    user: "pidrunhcm@gmail.com",
    pass: "Bravo@123"
}

web_host = {
    host: "localhost",
    port: 3050,
    protocal:"http"
}

path_host = {
    root : "D:\\Pidrun",
    Con_Att : "D:\\Pidrun\\Converssation_Attachment",
    Img_Att : "D:\\Pidrun\\User_Image"
}

module.exports = {
    email: email_server,
    web: web_host,
    server_path: path_host
}