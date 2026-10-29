---
name: no-code-comments
description: Dùng mỗi khi viết, sửa hoặc thêm mã trong dự án BeatPaper (index.html, style.css, app.js hay bất kỳ tệp mã nào). Quy tắc của chủ dự án là không viết comment trong code.
---

# Không viết comment trong code

Chủ dự án BeatPaper muốn mã không có comment. Áp dụng cho mọi ngôn ngữ trong dự án: HTML, CSS, JavaScript.

## Khi viết hoặc sửa mã

- Không thêm comment mới dưới bất kỳ dạng nào: `//`, `/* */`, `<!-- -->`, kể cả comment kiểu tiêu đề mục hay chú thích cuối dòng.
- Khi sửa một đoạn đã có comment, không viết thêm comment giải thích phần vừa sửa.
- Làm cho mã tự giải thích: đặt tên biến, hàm, hằng số và lớp CSS rõ nghĩa; tách hàm nhỏ có tên nói đúng việc nó làm thay vì viết comment mô tả khối lệnh.
- Lý do của một thay đổi viết vào commit message hoặc vào câu trả lời cho người dùng, không viết vào mã.

## Comment đã có sẵn

- Không tự ý xoá hàng loạt comment cũ. Chỉ xoá khi người dùng yêu cầu, hoặc khi chính dòng mã mà comment đó mô tả bị xoá.

## Ngoại lệ

- Giữ những dòng mà công cụ cần để chạy đúng, không phải để giải thích (ví dụ chỉ thị cho trình kiểm tra mã, giấy phép bắt buộc). Hiện dự án không có dòng nào như vậy.
