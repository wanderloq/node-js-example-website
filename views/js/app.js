document.addEventListener("DOMContentLoaded", () => {
  const btnLogin = document.querySelector("#l-button");
  const btnRegister = document.querySelector("#r-button");
  const btnChangePass = document.querySelector("#c-button");
  const send_portal = document.querySelector("#send_portal");
  const tableBody = document.querySelector("#rank-body");
  const rankButtons = document.getElementsByClassName("quick-rank");
  const addPost = document.querySelector("#addPost")
  const updatePost = document.querySelector("#updatePost")
  const tblBlog = document.querySelector("#tbl-blog")
  const deletePost = document.getElementsByClassName("delete-post")


  const getstatistic = () => {
    axios.post("/statistics").then((result) => {
      console.log()
      if (document.querySelector("#total_consortia") != undefined) {
        document.querySelector("#total_consortia").innerHTML = result.data[0].Value;
        document.querySelector("#total_player").innerHTML = result.data[1].Value;
        document.querySelector("#online_player").innerHTML = result.data[2].Value;
      }
    });
  };

  getstatistic();

  btnLogin != null &&
    btnLogin.addEventListener("click", () => {
      const username = document.querySelector("#l-username").value;
      const password = document.querySelector("#l-password").value;
      const captcha = document.querySelector("#l-captcha").value;
      if (username.length < 6 || password.length < 6) {
        errMsg("Kullanıcı adı veya şifre hatalı!", true);
        return;
      }
      axios
        .post("/login", {
          username,
          password,
          captcha,
        })
        .then((result) => {
          if (result.data.Msg != undefined) {
            if (result.data.Msg == "ok") {
              location.reload();
            } else {
              errMsg(result.data.Msg, true);
            }
          } else {
            errMsg(result.data, true);
          }
        })
        .catch((err) => {
          errMsg("Bir hata oluştu daha sonra tekrar deneyiniz!", true);
        });
    });

  btnRegister != null &&
    btnRegister.addEventListener("click", () => {
      const username = document.querySelector("#r-username").value;
      const password = document.querySelector("#r-password").value;
      const nickname = document.querySelector("#r-nickname").value;
      const email = document.querySelector("#r-email").value;
      const sex = document.querySelector("#r-sex").value;
      const captcha = document.querySelector("#r-captcha").value;
      if (
        nickname == "" ||
        username == "" ||
        password == "" ||
        email == "" ||
        captcha == ""
      ) {
        errMsg("Lütfen boş alan bırakmadan tekrar deneyiniz!", false);
        return;
      }
      axios
        .post("/register", {
          username,
          password,
          nickname,
          email,
          sex,
          captcha,
        })
        .then((result) => {
          if (result.data.Msg != undefined) {
            if (result.data.Msg == "ok") {
              location.reload();
            } else {
              errMsg(result.data.Msg, false);
            }
          } else {
            errMsg(result.data, false);
          }
        })
        .catch((err) => {
          errMsg("Bir hata oluştu daha sonra tekrar deneyiniz!", false);
        });
    });

  btnChangePass != null &&
    btnChangePass.addEventListener("click", () => {
      const oldPassword = document.querySelector("#old-password").value;
      const newPassword = document.querySelector("#new-password").value;
      const rnewPassword = document.querySelector("#rnew-password").value;
      const captcha = document.querySelector("#c-captcha").value;
      if (oldPassword == "" || newPassword == "" || rnewPassword == "") {
        errMsg("Lütfen boş alan bırakmayınız!", 3);
        return;
      }
      axios
        .post("/changepass", {
          oldPassword,
          newPassword,
          rnewPassword,
          captcha,
        })
        .then((result) => {
          if (result.data.Msg != undefined) {
            if (result.data.Msg == "ok") {
              alert("Şifre değiştirme başarılı hesabınıza tekrar giriş yapınız!")
              location.href ="/logout"
            } else {
              errMsg(result.data.Msg, 3);
            }
          } else {
            errMsg(result.data, 3);
          }
        })
        .catch((err) => {
          errMsg("Bir hata oluştu daha sonra tekrar deneyiniz!", 3);
        });
    });

  const errMsg = (msg, type) => {
    if (type != 3) {
      document.querySelector(type ? "#l-error" : "#r-error").innerHTML = msg;
      document.querySelector(type ? "#l-error" : "#r-error").style.display =
        "block";
    } else {
      document.querySelector("#c-error").innerHTML = msg;
      document.querySelector("#c-error").style.display = "block";
    }
  };
  addPost != null && addPost.addEventListener('click', () => {
    const Title = document.querySelector("#postTitle").value;
    const Detail = document.querySelector("#postDetail").value;
    const Type = document.querySelector("#postType").value;
    if(Title == "" || Detail == "" || isNaN(Type)) {
      blogError("Lütfen boş alan bırakmayınız!")
      return
    }
    const Url = convertToSlug(Title);
    axios.post('/blog', {
      Title,
      Detail,
      Type,
      Url
    }).then(result => {
      if(result.data != "no") {
        alert("Blog ekleme başarılı!")
        location.reload();
      } else {
        blogError("Bir hata oluştu lütfen daha sorna deneyiniz!")
      }
    }).catch(err => {
      blogError("Bir hata oluştu lütfen daha sorna deneyiniz!")
    })
  })

  updatePost != null && updatePost.addEventListener('click', () => {
    const Title = document.querySelector("#postTitle").value;
    const Detail = document.querySelector("#postDetail").value;
    const Type = document.querySelector("#postType").value;
    const ID = updatePost.value;
    if(Title == "" || Detail == "" || isNaN(Type)) {
      blogError("Lütfen boş alan bırakmayınız!")
      return
    }
    const Url = convertToSlug(Title);
    console.log(Title, Url)
    axios.put('/blog', {
      Title,
      Detail,
      Type,
      ID,
      Url
    }).then(result => {
      if(result.data != "no") {
        alert("Blog güncelleme başarılı!")
        location.href = "/blog"
      } else {
        blogError("Bir hata oluştu lütfen daha sorna deneyiniz!")
      }
    }).catch(err => {
      blogError("Bir hata oluştu lütfen daha sorna deneyiniz!")
    })
  })

  const blogError = (msg) => {
    var err = document.querySelector("#blog-err");
    err.innerHTML = msg
    err.style.display = "block"
  }
  for (var i = 0; i < rankButtons.length; i++) {
    rankButtons[i].addEventListener("click", (event) => {
      rankBtnDisable(true);
      rankButtonActive();
      axios
        .post(
          "/rank",
          {
            id: event.target.name,
          },
          { timeout: 1000 * 10 }
        )
        .then((result) => {
          changeTableTh(event.target.name);
          event.target.className = `${event.target.className} active-rank`;
          writeRankRow(result.data);
        })
        .catch((err) => {
          tableBody.innerHTML =
            "Sıralama verileri alınırken bir hata oluştu! Lütfen daha sonra tekrar deneyiniz.";
          rankBtnDisable(false);
        });
    });
  }

  const changeTableTh = (id) => {
    var th_name =
      document.querySelector("#rank-head").childNodes[1].children[1];
    var th_value =
      document.querySelector("#rank-head").childNodes[1].children[2];
    th_name.innerHTML = "NickName";
    switch (parseInt(id)) {
      case 1:
        th_value.innerHTML = "Savaşma G.";
        break;
      case 2:
        th_name.innerHTML = "Birlik Adı";
        th_value.innerHTML = "Savaşma G.";
        break;
      case 3:
        th_value.innerHTML = "Win";
        break;
      case 4:
        th_value.innerHTML = "Seviye";
        break;
      case 5:
        th_value.innerHTML = "Online T.";
        break;
      case 6:
        th_value.innerHTML = "Kupon";
        break;
    }
  };

  const writeRankRow = (data) => {
    var id = 1;
    tableBody.innerHTML = "";
    data.forEach((result) => {
      var tr = document.createElement("tr");
      var tr_id = document.createElement("td");
      tr_id.innerHTML = id;
      var td_name = document.createElement("td");
      td_name.innerHTML = result.Name;
      var td_value = document.createElement("td");
      td_value.innerHTML = result.Value;
      tr.appendChild(tr_id);
      tr.appendChild(td_name);
      tr.appendChild(td_value);
      tableBody.appendChild(tr);
      id++;
    });
    rankBtnDisable(false);
  };

  const rankButtonActive = () => {
    var rankButtons = document.getElementsByClassName("quick-rank");
    for (var i = 0; i < rankButtons.length; i++) {
      rankButtons[i].className = rankButtons[i].className.replace(
        "active-rank",
        ""
      );
    }
  };

  const rankBtnDisable = (disable) => {
    var rankButtons = document.getElementsByClassName("quick-rank");
    for (var i = 0; i < rankButtons.length; i++) {
      rankButtons[i].disabled = disable;
    }
  };



  send_portal != null &&
    send_portal.addEventListener("click", () => {
      send_portal.disabled = true;
      const captcha = document.querySelector("#portal-captcha").value;
      if (isNaN(captcha)) {
        errMsg("Lütfen güvenlik kodunu doğru giriniz!", false);
        return;
      }
      axios
        .post("/portal", {
          captcha,
        })
        .then((result) => {
          let data = result.data;
          if (data == "no") {
            errMsg(
              "Bir hata oluştu lütfen tekrar deneyin veya yetkililer ile iletişime geçin!",
              false
            );
          } else if (data == "banned") {
            errMsg(
              "Cihazınız sunucularımızdan kalıcı olarak yasaklanmıştır. Bunun bir hata olduğunu düşünüyorsanız bizimle iletişime geçin!",
              false
            );
          } else if (data) {
            location.href = "/play";
          }
          send_portal.disabled = false;
        })
        .catch((err) => {
          errMsg("Bir hata oluştu daha sonra tekrar deneyiniz!", true);
          send_portal.disabled = false;
        });
    });

  
  function convertToSlug(s, opt) {
    s = String(s);
    opt = Object(opt);
    
    var defaults = {
      'delimiter': '-',
      'limit': undefined,
      'lowercase': true,
      'replacements': {},
      'transliterate': (typeof(XRegExp) === 'undefined') ? true : false
    };
    
    // Merge options
    for (var k in defaults) {
      if (!opt.hasOwnProperty(k)) {
        opt[k] = defaults[k];
      }
    }
    
    var char_map = {
      // Latin
      'À': 'A', 'Á': 'A', 'Â': 'A', 'Ã': 'A', 'Ä': 'A', 'Å': 'A', 'Æ': 'AE', 'Ç': 'C', 
      'È': 'E', 'É': 'E', 'Ê': 'E', 'Ë': 'E', 'Ì': 'I', 'Í': 'I', 'Î': 'I', 'Ï': 'I', 
      'Ð': 'D', 'Ñ': 'N', 'Ò': 'O', 'Ó': 'O', 'Ô': 'O', 'Õ': 'O', 'Ö': 'O', 'Å': 'O', 
      'Ø': 'O', 'Ù': 'U', 'Ú': 'U', 'Û': 'U', 'Ü': 'U', 'Å°': 'U', 'Ý': 'Y', 'Þ': 'TH', 
      'ß': 'ss', 
      'à': 'a', 'á': 'a', 'â': 'a', 'ã': 'a', 'ä': 'a', 'å': 'a', 'æ': 'ae', 'ç': 'c', 
      'è': 'e', 'é': 'e', 'ê': 'e', 'ë': 'e', 'ì': 'i', 'í': 'i', 'î': 'i', 'ï': 'i', 
      'ð': 'd', 'ñ': 'n', 'ò': 'o', 'ó': 'o', 'ô': 'o', 'õ': 'o', 'ö': 'o', 'Å': 'o', 
      'ø': 'o', 'ù': 'u', 'ú': 'u', 'û': 'u', 'ü': 'u', 'Å±': 'u', 'ý': 'y', 'þ': 'th', 
      'ÿ': 'y',
  
      // Latin symbols
      '©': '(c)',
  
      // Greek
      'Α': 'A', 'Β': 'B', 'Γ': 'G', 'Δ': 'D', 'Ε': 'E', 'Ζ': 'Z', 'Η': 'H', 'Θ': '8',
      'Ι': 'I', 'Κ': 'K', 'Λ': 'L', 'Μ': 'M', 'Ν': 'N', 'Ξ': '3', 'Ο': 'O', 'Π': 'P',
      'Ρ': 'R', 'Σ': 'S', 'Τ': 'T', 'Υ': 'Y', 'Φ': 'F', 'Χ': 'X', 'Ψ': 'PS', 'Ω': 'W',
      'Î': 'A', 'Î': 'E', 'Î': 'I', 'Î': 'O', 'Î': 'Y', 'Î': 'H', 'Î': 'W', 'Îª': 'I',
      'Î«': 'Y',
      'α': 'a', 'β': 'b', 'γ': 'g', 'δ': 'd', 'ε': 'e', 'ζ': 'z', 'η': 'h', 'θ': '8',
      'ι': 'i', 'κ': 'k', 'λ': 'l', 'μ': 'm', 'ν': 'n', 'ξ': '3', 'ο': 'o', 'π': 'p',
      'ρ': 'r', 'σ': 's', 'τ': 't', 'υ': 'y', 'φ': 'f', 'χ': 'x', 'ψ': 'ps', 'ω': 'w',
      'Î¬': 'a', 'Î­': 'e', 'Î¯': 'i', 'Ï': 'o', 'Ï': 'y', 'Î®': 'h', 'Ï': 'w', 'ς': 's',
      'Ï': 'i', 'Î°': 'y', 'Ï': 'y', 'Î': 'i',
  
      // Turkish
      'Å': 'S', 'Ä°': 'I', 'Ç': 'C', 'Ü': 'U', 'Ö': 'O', 'Ä': 'G','Ğ': 'G','İ': 'I',
      'Å': 's', 'Ä±': 'i', 'ç': 'c', 'ü': 'u', 'ö': 'o', 'Ä': 'g','ğ': 'g', 'ı': 'i',
  
      // Russian
      'Ð': 'A', 'Ð': 'B', 'Ð': 'V', 'Ð': 'G', 'Ð': 'D', 'Ð': 'E', 'Ð': 'Yo', 'Ð': 'Zh',
      'Ð': 'Z', 'Ð': 'I', 'Ð': 'J', 'Ð': 'K', 'Ð': 'L', 'Ð': 'M', 'Ð': 'N', 'Ð': 'O',
      'Ð': 'P', 'Ð ': 'R', 'Ð¡': 'S', 'Ð¢': 'T', 'Ð£': 'U', 'Ð¤': 'F', 'Ð¥': 'H', 'Ð¦': 'C',
      'Ð§': 'Ch', 'Ð¨': 'Sh', 'Ð©': 'Sh', 'Ðª': '', 'Ð«': 'Y', 'Ð¬': '', 'Ð­': 'E', 'Ð®': 'Yu',
      'Ð¯': 'Ya',
      'Ð°': 'a', 'Ð±': 'b', 'Ð²': 'v', 'Ð³': 'g', 'Ð´': 'd', 'Ðµ': 'e', 'Ñ': 'yo', 'Ð¶': 'zh',
      'Ð·': 'z', 'Ð¸': 'i', 'Ð¹': 'j', 'Ðº': 'k', 'Ð»': 'l', 'Ð¼': 'm', 'Ð½': 'n', 'Ð¾': 'o',
      'Ð¿': 'p', 'Ñ': 'r', 'Ñ': 's', 'Ñ': 't', 'Ñ': 'u', 'Ñ': 'f', 'Ñ': 'h', 'Ñ': 'c',
      'Ñ': 'ch', 'Ñ': 'sh', 'Ñ': 'sh', 'Ñ': '', 'Ñ': 'y', 'Ñ': '', 'Ñ': 'e', 'Ñ': 'yu',
      'Ñ': 'ya',
  
      // Ukrainian
      'Ð': 'Ye', 'Ð': 'I', 'Ð': 'Yi', 'Ò': 'G',
      'Ñ': 'ye', 'Ñ': 'i', 'Ñ': 'yi', 'Ò': 'g',
  
      // Czech
      'Ä': 'C', 'Ä': 'D', 'Ä': 'E', 'Å': 'N', 'Å': 'R', 'Š': 'S', 'Å¤': 'T', 'Å®': 'U', 
      'Å½': 'Z', 
      'Ä': 'c', 'Ä': 'd', 'Ä': 'e', 'Å': 'n', 'Å': 'r', 'š': 's', 'Å¥': 't', 'Å¯': 'u',
      'Å¾': 'z', 
  
      // Polish
      'Ä': 'A', 'Ä': 'C', 'Ä': 'e', 'Å': 'L', 'Å': 'N', 'Ó': 'o', 'Å': 'S', 'Å¹': 'Z', 
      'Å»': 'Z', 
      'Ä': 'a', 'Ä': 'c', 'Ä': 'e', 'Å': 'l', 'Å': 'n', 'ó': 'o', 'Å': 's', 'Åº': 'z',
      'Å¼': 'z',
  
      // Latvian
      'Ä': 'A', 'Ä': 'C', 'Ä': 'E', 'Ä¢': 'G', 'Äª': 'i', 'Ä¶': 'k', 'Ä»': 'L', 'Å': 'N', 
      'Š': 'S', 'Åª': 'u', 'Å½': 'Z', 
      'Ä': 'a', 'Ä': 'c', 'Ä': 'e', 'Ä£': 'g', 'Ä«': 'i', 'Ä·': 'k', 'Ä¼': 'l', 'Å': 'n',
      'š': 's', 'Å«': 'u', 'Å¾': 'z'
    };
    
    // Make custom replacements
    for (var k in opt.replacements) {
      s = s.replace(RegExp(k, 'g'), opt.replacements[k]);
    }
    
    // Transliterate characters to ASCII
    if (opt.transliterate) {
      for (var k in char_map) {
        s = s.replace(RegExp(k, 'g'), char_map[k]);
      }
    }
    
    // Replace non-alphanumeric characters with our delimiter
    var alnum = (typeof(XRegExp) === 'undefined') ? RegExp('[^a-z0-9]+', 'ig') : XRegExp('[^\\p{L}\\p{N}]+', 'ig');
    s = s.replace(alnum, opt.delimiter);
    
    // Remove duplicate delimiters
    s = s.replace(RegExp('[' + opt.delimiter + ']{2,}', 'g'), opt.delimiter);
    
    // Truncate slug to max. characters
    s = s.substring(0, opt.limit);
    
    // Remove delimiter from ends
    s = s.replace(RegExp('(^' + opt.delimiter + '|' + opt.delimiter + '$)', 'g'), '');
    
    return opt.lowercase ? s.toLowerCase() : s;
  }
  
    if(tblBlog != null) {
      axios.get('/blog/all', {
        type: "all"
      }).then(result => {
        if(result.data != "no") {
          var _myTable = new myTable(
            result.data,
            "",
            "",
            10,
            tblBlog
          );
        }
      })
     
    }
    
});
