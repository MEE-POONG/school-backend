export const userAGForm = [
    { title: "position", labelShow: "เลือกตำแหน่ง", placeholderShow: "กรุณาเลือก", typeShow: "dropdown", rules: 1, invalidFeedback: "ต้องเลือกข้อมูล", list: [{ text: "agent" }, { text: "master" }, { text: "senior" },], rowForm: 1 },
    { title: "originAG", labelShow: "OriginAG / ยูสต้นสาย", placeholderShow: "เลือกยูสเต้นสาย", typeShow: "search", rules: 2, invalidFeedback: "ระบบยูสต้นสาย", arraySearch: "partner", rowForm: 1 },
    { title: "username", labelShow: "usernameAG / ยูสเซอร์AG", placeholderShow: "ระบุยูสใหม่", typeShow: "text", rules: 2, invalidFeedback: "กรอก usernameAG ให้ถูกต้อง", rowForm: 1 },
    { title: "percent", labelShow: "เลือกเปอร์เซ็น", placeholderShow: "เลือกเปอร์เซ็นจ่าย", typeShow: "select", rules: 2, invalidFeedback: "กำหนดเปอร์เซ็น", min: 0, max: 50, rowForm: 1 },
    { title: "overdue", labelShow: "มีค้างบวก", placeholderShow: "ไม่มีค้างบวก", typeShow: "onOff", rules: 2, invalidFeedback: "", rowForm: 2 },
    { title: "commission", labelShow: "รับค่าคอม", placeholderShow: "ไม่รับค่าคอม", typeShow: "onOff", rules: 2, invalidFeedback: "", rowForm: 2 },
    { title: "adjustPercentage", labelShow: "ปรับเปอร์เซ็น", placeholderShow: "ไม่ปรับเปอร์เซ็น", typeShow: "onOff", rules: 2, invalidFeedback: "", rowForm: 2 },
    { title: "pay", labelShow: "จ่ายเงิน", placeholderShow: "ไม่จ่ายเงิน", typeShow: "onOff", rules: 2, invalidFeedback: "" },
    { title: "customerCommission", labelShow: "ให้ค่าคอมลูกค้า", placeholderShow: "ไม่ให้ค่าคอมลูกค้า", typeShow: "onOff", rules: 2, invalidFeedback: "", rowForm: 2 },
    { title: "actuallypaid", labelShow: "จ่ายยอดเต็ม", placeholderShow: "จ่ายยอดจริง", typeShow: "onOff", rules: 2, invalidFeedback: "", rowForm: 2 },
    { title: "recommender", labelShow: "Recommender / ผู้แนะนำ", placeholderShow: "เลือกยูสที่แนะนำ", typeShow: "text", rules: 0, invalidFeedback: "ระบุผู้แนะนำที่จะได้รับยอดแนะนำ", rowForm: 3 },
];
export const memberForm = [
    { id: "1", value: 'กสิกรไทย', image: 'https://imagedelivery.net/QZ6TuL-3r02W7wQjQrv5DA/446b4b9c-af1e-47aa-e475-784f42d5a300/100' },
    { id: "2", value: 'ไทยพานิชย์', image: 'https://imagedelivery.net/QZ6TuL-3r02W7wQjQrv5DA/25ab88ca-e5c6-46d3-c65d-a951d8485400/100' },
    { id: "3", value: 'กรุงศรี', image: 'https://imagedelivery.net/QZ6TuL-3r02W7wQjQrv5DA/1e48feb2-d581-444e-b38d-395ffc3eb700/100' },
    { id: "4", value: 'กรุงไทย', image: 'https://imagedelivery.net/QZ6TuL-3r02W7wQjQrv5DA/793c2889-d87d-4bd7-65e4-7131faed5f00/100' },
    { id: "5", value: 'ออมสิน', image: 'https://imagedelivery.net/QZ6TuL-3r02W7wQjQrv5DA/370eda5c-ead4-4454-6981-724ee017b700/100' },
    { id: "6", value: 'ธนชาติ', image: 'https://imagedelivery.net/QZ6TuL-3r02W7wQjQrv5DA/7b242ada-faae-48af-418f-0601a40b0b00/100' },
];