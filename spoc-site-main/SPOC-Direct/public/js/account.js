function get_car_personal(car){
    return `<li className="list-group-item">
    <div className="row">
                    <div class="col">${car.year}</div>
                    <div class="col">${car.make}</div>
                    <div class="col">${car.model}</div>
                    <div class="col">${car.color}</div>
                    <div class="col">${car.price}</div>
    </div>
</li>`
}

//testing commit again


function load_user(user) {
    $('#name').text(user.username);
    $('#profile_img').attr('src', user.profile);
}
$(document).ready(function () {
    $.getJSON("/get_all_tags")
        .done(function (data) {
            console.log(data.data)
            if (data.message === "success") {
                data.data.forEach(likedtag=>{
                    $('#tag_list_personal').append(get_tags(likedtag));
                })
            }
        });
        $.getJSON('/get_current_user')
            .done(function (data) {
                if (data["message"] === "success") {
                    let user = data["data"];
                    load_user(user);
                    $('.login').remove();
                    $('#showname').text(user.fullname);
                    console.log(user)
                }else{
                    $('.logout').remove();
                }
            });
});

