const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const post_id = urlParams.get('post_id');

function get_post_block(post, idx) {
    return `<div class="post_block ${idx % 2 === 0 ? 'even_row' : 'odd_row'}">
                <div class="row">
                    <div class="col-2">${post.username}</div>
                    <div class="col-1">${post.title}</div>
                    <div class="col-2">${post.url}</div>
                    <div class="col-2">${post.detail}</div>
                    <div class="col-1">${post.tags}</div>
                    <div class="col-2">${post.replys}</div>
                    <div class="col-1">${post.timepost}</div>
                    <div class="col-1 d-flex justify-content-end" data-username="${post.username}" data-title="${post.title}" data-url="${post.url}" data-detail="${post.detail}" data-tags="${post.tags}" data-replys="${post.replys}"data-timepost="${post.timepost}">
                        <button class="btn like btn-outline-primary" value="0">
                        Like</button>
                    </div>
                </div>
            </div>`
}

function showList(posts) {
    $('#fav_list').empty();

    posts.forEach((post,idx)=>{
        $('#fav_list')
            .append(get_post_block(post,idx))
    })

}
$(document).ready(()=>{
    $.getJSON('/get_current_user').done((data)=>{
        if(data.message==="success"){
            const user = data.data;
            $('.login').remove();
            $('#showname').text(user.fullname);
            $.getJSON('/get_all_posts').done(function (data) {
                console.log("sent")
                if (data.message === "success") {
                    /*        filterList(data.data);*/
                    showList(data.data);
                    console.log(data)
                }
            })
            $('.like').on('click', function () {
                const post_username = $(this).parents('div').attr('data-username');
                const post_title = $(this).parents('div').attr('data-title');
                const post_url = $(this).parents('div').attr('data-url');
                const post_detail =$(this).parents('div').attr('data-detail');
                const post_tags = $(this).parents('div').attr('data-tags');
                const post_replys = $(this).parents('div').attr('data-replys');
                const post_timepost = $(this).parents('div').attr('data-timepost');
                $.post('/update_likes', {username:post_username, title:post_make,url:post_model,detail:post_color,tags:post_price,replys:post_year,timepost:post_year}).done(
                    (data)=>{
                        if(data.message==="success"){
                            console.log("winrar!");
                        }else{
                            //handling database error
                            console.log("bot");
                        }
                    }
                )
            });
        }else{
            $('.logout').remove();
            $('.like').on('click', function () {
                location.href = "/login";
            });
        }
    })
})

