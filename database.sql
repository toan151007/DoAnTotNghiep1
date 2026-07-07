USE DoAnTotNghiep;
GO

-- Xóa bảng cũ nếu đã tồn tại
IF OBJECT_ID('dbo.Quiz', 'U') IS NOT NULL
BEGIN
    DROP TABLE dbo.Quiz;
END
GO

-- Thiết lập lại bảng dbo.Quiz với cấu trúc chuẩn
CREATE TABLE dbo.Quiz (
    QuizId INT IDENTITY(1,1) PRIMARY KEY,
    Title NVARCHAR(255) NOT NULL,
    Description NVARCHAR(MAX) NULL
);
GO

-- Thêm dữ liệu mẫu vào bảng dbo.Quiz
INSERT INTO dbo.Quiz (Title, Description) 
VALUES (N'Ôn tập Lập trình Web', N'Bộ đề ôn thi giữa kỳ - 40 câu hỏi');

INSERT INTO dbo.Quiz (Title, Description) 
VALUES (N'Kiểm tra Cơ sở dữ liệu', N'Đề trắc nghiệm chương 1, 2, 3');
GO
