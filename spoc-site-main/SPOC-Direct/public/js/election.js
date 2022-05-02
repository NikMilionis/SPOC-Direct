$(document).ready(() => {
    $.getJSON('/get_current_user').done((data) => {
        if (data.message === "success") {
            const user = data.data;
            $('.login').remove();
            $('#showname').text(user.username);
        } else {
            $('.logout').remove();
        }
    })
})


let countpres = 1;
let countvp = 1
let countsecr = 1
let counttres = 1


$.getJSON("/get_pres")
    .done(function (data) {
        if (data.message === "success") {
            ////console.log(data.data)
            data.data.forEach(function (data, idx) {
                //console.log(countpres)
                $("#presnum").text(countpres + " Candidates")

                //console.log(presInfo)
                countpres++;

            })
        }
    });

$.getJSON("/get_vp")
    .done(function (data) {
        if (data.message === "success") {
            //console.log(data.data)
            let count = 0;
            data.data.forEach(function (data, idx) {
                ////console.log(data)
                $("#vpnum").text(countvp + " Candidates")                // viceInfo.push([data.Candidate ,data.Votes, count])
                //console.log(viceInfo)
                countvp++;

            })
        }
    });

$.getJSON("/get_secr")
    .done(function (data) {
        if (data.message === "success") {
            let count = 0;
            data.data.forEach(function (data, idx) {
                ////console.log(data)
                $("#secnum").text(countsecr + " Candidates")                // secrInfo.name.push(data.Candidate);
                // secrInfo.idx.push(count);
                // secrInfo.push([data.Candidate ,data.Votes, count])
                //console.log(viceInfo)
                countsecr++;

            })
        }
    });


$.getJSON("/get_tres")
    .done(function (data) {
        if (data.message === "success") {
            data.data.forEach(function (data, idx) {
                console.log(data.Candidate)

                $("#tresnum").text(counttres + " Candidates")                // tresInfo.push([data.Candidate , data.Votes, count])
                //console.log(tresInfo)
                counttres++;

            })
        }
    });
