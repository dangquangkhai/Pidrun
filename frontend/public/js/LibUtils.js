var moment = require("moment");

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

class LibUtils {
    static formatDate(date) {
        if (date !== undefined && date !== null && date !== "") {
            return moment(date).format("DD/MM/YYYY");
        } else {
            return "Chưa đặt dữ liệu";
        }
    }

    static formatDate(date, type) {
        if (!LibUtils.isEmpty(date)) {
            if (LibUtils.isEmpty(type))
                return moment(date).format("DD/MM/YYYY");
            else {
                try {
                    return moment(date).format(type);
                } catch (ex) {
                    console.log("Exception:" + ex);
                    return null;
                }
            }

        } else {
            return "Chưa đặt dữ liệu";
        }
    }

    static isEmpty(text) {
        if (text !== null && text !== undefined && text !== "") {
            return false;
        }
        return true;
    }

    static getData(url) {
        var data = undefined;
        if (LibUtils.isEmpty(url)) {
            data = false;
        } else {
            axios
                .get(url)
                .then(responese => {
                    data = responese;
                });
        }
        return data;
    }

    static cloneObject(obj) {
        var clone = {};
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) //ensure not adding inherited props
                clone[key] = obj[key];
        }
        return clone;
    }

    static clearObject(obj) {
        for (var key in obj) {
            obj[key] = null;
        }
    }

    static clearArrObject(obj) {
        for (var item = 0; item < obj.length; i++) {
            this.clearObject(item);
        }
    }

    static convertToJsDate(obj) {
        var date = obj.split("/");
        var output = new Date(+date[2], date[1] - 1, +date[0]);
        return output;
    }

    static convertDate(inputFormat) {
        function pad(s) {
            return (s < 10) ? '0' + s : s;
        }
        var d = new Date(inputFormat);
        return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join('/');
    }

    static formatDayHour(date) {
        if (date !== undefined && date !== null && date !== "") {
            return moment(date).format("DD/MM/YYYY HH:mm");
        } else {
            return "Chưa đặt dữ liệu";
        }
    }


    static MoneyToTxt(total) {
        try {
            var rs = "";
            total = Math.round(total);
            var ch = ["không", "một", "hai", "ba", "bốn", "năm", "sáu", "bảy", "tám", "chín"];
            var rch = ["lẻ", "mốt", "", "", "", "lăm"];
            var u = ["", "mươi", "trăm", "ngàn", "", "", "triệu", "", "", "tỷ", "", "", "ngàn", "", "",
                "triệu"
            ];
            var nstr = total.toString();
            var n = [];
            var len = nstr.length;
            for (var i = 0; i < len; i++) {
                n[len - 1 - i] = parseInt(nstr[i]);
            }
            for (var i = len - 1; i >= 0; i--) {
                if (i % 3 === 2) // số 0 ở hàng trăm
                {
                    if (n[i] === 0 && n[i - 1] === 0 && n[i - 2] === 0)
                        continue; //nếu cả 3 số là 0 thì bỏ qua không đọc
                } else if (i % 3 === 1) // số ở hàng chục
                {
                    if (n[i] === 0) {
                        if (n[i - 1] === 0) {
                            continue;
                        } // nếu hàng chục và hàng đơn vị đều là 0 thì bỏ qua.
                        else {
                            rs += " " + rch[n[i]];
                            continue; // hàng chục là 0 thì bỏ qua, đọc số hàng đơn vị
                        }
                    }
                    if (n[i] === 1) //nếu số hàng chục là 1 thì đọc là mười
                    {
                        rs += " mười";
                        continue;
                    }
                } else if (i !== len - 1) {
                    if (n[i] === 0) // số hàng đơn vị là 0 thì chỉ đọc đơn vị
                    {
                        if (i + 2 <= len - 1 && n[i + 2] === 0 && n[i + 1] === 0) continue;
                        rs += " " + (i % 3 === 0 ? u[i] : u[i % 3]);
                        continue;
                    }
                    if (n[i] === 1) // nếu là 1 thì tùy vào số hàng chục mà đọc: 0,1: một / còn lại: mốt
                    {
                        rs += " " + ((n[i + 1] === 1 || n[i + 1] === 0) ? ch[n[i]] : rch[n[i]]);
                        rs += " " + (i % 3 === 0 ? u[i] : u[i % 3]);
                        continue;
                    }
                    if (n[i] === 5) // cách đọc số 5
                    {
                        if (n[i + 1] !== 0) //nếu số hàng chục khác 0 thì đọc số 5 là lăm
                        {
                            rs += " " + rch[n[i]]; // đọc số
                            rs += " " + (i % 3 === 0 ? u[i] : u[i % 3]); // đọc đơn vị
                            continue;
                        }
                    }
                }
                rs += (rs === "" ? " " : ", ") + ch[n[i]]; // đọc số
                rs += " " + (i % 3 === 0 ? u[i] : u[i % 3]); // đọc đơn vị
            }

            rs = rs.trim();
            rs += " đồng";


            if (rs.Length > 2) {
                var rs1 = rs.substring(0, 2);
                rs1 = rs1.ToUpper();
                rs = rs.substring(2);
                rs = rs1 + rs;
            }

            rs = rs.charAt(0).toUpperCase() + rs.slice(1);
            return rs.trim().replaceAll("lẻ,", "lẻ").replaceAll("mươi,", "mươi").replaceAll("trăm,",
                "trăm").replaceAll("mười,", "mười").replaceAll(",", "");

        } catch (ex) {
            console.log("Error:" + ex);
            return "";
        }
    }

    static callToast(title, messange, flag = "success", time = 5000, autoClose = true, limitShowToast = 5, transition = "slide", location = "bottom-left", backgroundcolor = undefined, textcolor = undefined) {

        if (flag === "No-Icon") {
            return $.toast({
                heading: title,
                text: messange,
                showHideTransition: transition,
                allowToastClose: autoClose,
                hideAfter: time,
                position: location,
                stack: limitShowToast
            });
        } else {
            return $.toast({
                heading: title,
                text: messange,
                showHideTransition: transition,
                allowToastClose: autoClose,
                hideAfter: time,
                icon: flag,
                position: location,
                stack: limitShowToast
            });
        }

    }
}

export {
    LibUtils
};