 const dataConfig = {
    id: ["email", "password", "name", "gender", "phone"],
    name: ["Email", "Password", "Họ tên", "Giới tính", "Số điện thoại"],
    errorMessage: ["Email phải đúng định dạng!", "Passworld không hợp lệ!", "Tên chỉ được điền chữ!", "Giới tính phải được chọn!", "Số điện thoại chỉ được điền số!"],
    icon: ["envelope", "lock", "file-signature", "venus-mars", "phone"],
    reg: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{0,}$/, "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" + "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" + "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$", "^([Tt][Rr][Uu][Ee]|[Ff][Aa][Ll][Ss][Ee])$", /^[0-9]+$/]
}

export default dataConfig;