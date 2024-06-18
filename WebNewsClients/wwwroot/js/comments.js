﻿document.addEventListener('DOMContentLoaded', function () {
    // Lấy tất cả các thẻ a có class 'comment-reply-link'
    const replyLinks = document.querySelectorAll('.comment-reply-link');

    // Thêm event listener cho mỗi thẻ a
    replyLinks.forEach(function (link) {
        link.addEventListener('click', function (event) {
            event.preventDefault(); // Ngăn chặn hành vi mặc định của thẻ a nếu cần
            // Lấy các dữ liệu từ thuộc tính data-*
            const commentId = link.dataset.commentid;
            const articleid = link.dataset.articleid;
            const userid = link.dataset.userid;

            document.getElementById('articleId').value = articleid;
            document.getElementById('userId').value = userid; // Thay thế 'currentUserId' bằng ID người dùng hiện tại nếu có
            document.getElementById('replyFor').value = commentId;

            // In các dữ liệu ra console hoặc xử lý chúng theo nhu cầu của bạn
            console.log('Comment ID:', commentId);
            console.log('Article ID:', articleid);
            console.log('User Id:', userid);
            

            // Bạn có thể thực hiện các hành động khác tại đây
        });
    });

    $('#commentform').on('submit', function (event) {
        event.preventDefault(); // Ngăn chặn hành vi mặc định của form

        // Tạo đối tượng FormData từ form
        var formData = new FormData(this);

        // Lấy dữ liệu từ các input ẩn và thêm vào FormData nếu chưa có
        if (!formData.has('ArticleId')) {
            formData.append('ArticleId', $('#articleId').val());
        }
        if (!formData.has('UserId')) {
            formData.append('UserId', $('#userId').val());
        }
        if (!formData.has('ReplyFor')) {
            formData.append('ReplyFor', $('#replyFor').val());
        }
        const data = {};
        let requestToken = "";
        formData.forEach((value, key) => {
            if (key != "comment_post_ID" & key != "comment_parent"
                & key != "__RequestVerificationToken"
                & key != "wantispam_q" & key != "wantispam_e_email_url_website") {
                data[key] = value;
            }
            if (key == "__RequestVerificationToken") {
                requestToken = value;
            }
            
        });
        // In ra console để kiểm tra các giá trị
        console.log(JSON.stringify(data));
        var urlComment = "";
        // Tạo và gửi request bằng AJAX
        $.ajax({
            url: `https://localhost:7251/api/Comments`,
            type: 'POST',
            data: JSON.stringify(data), // Chuyển đổi dữ liệu thành chuỗi JSON
            contentType: "application/json",
            success: function (result, status, xhr) {
                
                console.log('Success:', result);
            },
            error: function (xhr, status, error) {
                var text = xhr.responseText;
                console.log(text)
            }
        });
    });

    
});


