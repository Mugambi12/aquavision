const revenues = [
  {
    _id: "1",
    date: "2023-01-05",
    source: "Product Sales",
    customer: "Customer A",
    amount: 1200,
    description: "Product X",
    status: "Received",
    method: "Card",
    payment_method: "Credit Card",
    payment_status: "Completed",
    transaction_id: "RX12345",
  },
  {
    _id: "2",
    date: "2023-02-10",
    source: "Service Fee",
    customer: "Customer B",
    amount: 800,
    description: "Consulting Service",
    status: "Received",
    method: "Bank",
    payment_method: "Bank Transfer",
    payment_status: "Completed",
    transaction_id: "RX12346",
  },
  {
    _id: "3",
    date: "2023-03-15",
    source: "Subscription",
    customer: "Customer C",
    amount: 150,
    description: "Monthly Subscription",
    status: "Cancelled",
    method: "Card",
    payment_method: "Credit Card",
    payment_status: "Completed",
    transaction_id: "RX12347",
  },
  {
    _id: "4",
    date: "2023-04-20",
    source: "Product Sales",
    customer: "Customer D",
    amount: 1800,
    description: "Product Y",
    status: "Received",
    method: "Bank",
    payment_method: "Bank Transfer",
    payment_status: "Completed",
    transaction_id: "RX12348",
  },
  {
    _id: "5",
    date: "2023-05-25",
    source: "Service Fee",
    customer: "Customer E",
    amount: 1000,
    description: "Development Service",
    status: "Cancelled",
    method: "Card",
    payment_method: "Cash",
    payment_status: "Completed",
    transaction_id: "RX12349",
  },
  {
    _id: "6",
    date: "2023-06-10",
    source: "Subscription",
    customer: "Customer F",
    amount: 200,
    description: "Monthly Subscription",
    status: "Received",
    method: "Card",
    payment_method: "Credit Card",
    payment_status: "Completed",
    transaction_id: "RX12350",
  },
  {
    _id: "7",
    date: "2023-07-15",
    source: "Product Sales",
    customer: "Customer G",
    amount: 2100,
    description: "Product Z",
    status: "Received",
    method: "Bank",
    payment_method: "Bank Transfer",
    payment_status: "Completed",
    transaction_id: "RX12351",
  },
  {
    _id: "8",
    date: "2023-08-20",
    source: "Service Fee",
    customer: "Customer H",
    amount: 700,
    description: "Training Service",
    status: "Received",
    method: "Card",
    payment_method: "Credit Card",
    payment_status: "Completed",
    transaction_id: "RX12352",
  },
  {
    _id: "9",
    date: "2023-09-05",
    source: "Subscription",
    customer: "Customer I",
    amount: 250,
    description: "Monthly Subscription",
    status: "Cancelled",
    method: "Bank",
    payment_method: "Bank Transfer",
    payment_status: "Completed",
    transaction_id: "RX12353",
  },
  {
    _id: "10",
    date: "2023-10-15",
    source: "Product Sales",
    customer: "Customer J",
    amount: 1400,
    description: "Product W",
    status: "Received",
    method: "Card",
    payment_method: "Cash",
    payment_status: "Completed",
    transaction_id: "RX12354",
  },
  {
    _id: "11",
    date: "2023-11-10",
    source: "Service Fee",
    customer: "Customer K",
    amount: 900,
    description: "Maintenance Service",
    status: "Received",
    method: "Card",
    payment_method: "Credit Card",
    payment_status: "Completed",
    transaction_id: "RX12355",
  },
  {
    _id: "12",
    date: "2023-12-20",
    source: "Subscription",
    customer: "Customer L",
    amount: 300,
    description: "Monthly Subscription",
    status: "Received",
    method: "Bank",
    payment_method: "Bank Transfer",
    payment_status: "Completed",
    transaction_id: "RX12356",
  },
  {
    _id: "13",
    date: "2024-01-05",
    source: "Product Sales",
    customer: "Customer M",
    amount: 1600,
    description: "Product V",
    status: "Received",
    method: "Card",
    payment_method: "Credit Card",
    payment_status: "Completed",
    transaction_id: "RX12357",
  },
  {
    _id: "14",
    date: "2024-02-15",
    source: "Service Fee",
    customer: "Customer N",
    amount: 1100,
    description: "Design Service",
    status: "Received",
    method: "Bank",
    payment_method: "Bank Transfer",
    payment_status: "Completed",
    transaction_id: "RX12358",
  },
  {
    _id: "15",
    date: "2024-03-10",
    source: "Subscription",
    customer: "Customer O",
    amount: 350,
    description: "Monthly Subscription",
    status: "Received",
    method: "Cash",
    payment_method: "Cash",
    payment_status: "Completed",
    transaction_id: "RX12359",
  },
  {
    _id: "16",
    date: "2024-04-05",
    source: "Product Sales",
    customer: "Customer P",
    amount: 1300,
    description: "Product U",
    status: "Received",
    method: "Card",
    payment_method: "Credit Card",
    payment_status: "Completed",
    transaction_id: "RX12360",
  },
  {
    _id: "17",
    date: "2024-05-20",
    source: "Service Fee",
    customer: "Customer Q",
    amount: 1200,
    description: "SEO Service",
    status: "Received",
    method: "Bank",
    payment_method: "Bank Transfer",
    payment_status: "Completed",
    transaction_id: "RX12361",
  },
  {
    _id: "18",
    date: "2024-06-25",
    source: "Subscription",
    customer: "Customer R",
    amount: 400,
    description: "Monthly Subscription",
    status: "Received",
    method: "Cash",
    payment_method: "Cash",
    payment_status: "Completed",
    transaction_id: "RX12362",
  },
  {
    _id: "19",
    date: "2024-07-10",
    source: "Product Sales",
    customer: "Customer S",
    amount: 2200,
    description: "Product T",
    status: "Received",
    method: "Cash",
    payment_method: "Cash",
    payment_status: "Completed",
    transaction_id: "RX12363",
  },
  {
    _id: "20",
    date: "2024-08-15",
    source: "Service Fee",
    customer: "Customer T",
    amount: 1300,
    description: "Marketing Service",
    status: "Received",
    method: "Bank",
    payment_method: "Bank Transfer",
    payment_status: "Completed",
    transaction_id: "RX12364",
  },
  {
    _id: "21",
    date: "2024-09-05",
    source: "Subscription",
    customer: "Customer U",
    amount: 450,
    description: "Monthly Subscription",
    status: "Received",
    method: "Card",
    payment_method: "Credit Card",
    payment_status: "Completed",
    transaction_id: "RX12365",
  },
  {
    _id: "22",
    date: "2024-10-25",
    source: "Product Sales",
    customer: "Customer V",
    amount: 1900,
    description: "Product S",
    status: "Cancelled",
    method: "Bank",
    payment_method: "Bank Transfer",
    payment_status: "Completed",
    transaction_id: "RX12366",
  },
  {
    _id: "23",
    date: "2024-11-15",
    source: "Service Fee",
    customer: "Customer W",
    amount: 1400,
    description: "Analytics Service",
    status: "Received",
    method: "Cash",
    payment_method: "Cash",
    payment_status: "Completed",
    transaction_id: "RX12367",
  },
  {
    _id: "24",
    date: "2024-12-10",
    source: "Subscription",
    customer: "Customer X",
    amount: 500,
    description: "Monthly Subscription",
    status: "Cancelled",
    method: "Card",
    payment_method: "Credit Card",
    payment_status: "Completed",
    transaction_id: "RX12368",
  },
  {
    _id: "25",
    date: "2024-12-30",
    source: "Product Sales",
    customer: "Customer Y",
    amount: 1700,
    description: "Product R",
    status: "Received",
    method: "Bank",
    payment_method: "Bank Transfer",
    payment_status: "Completed",
    transaction_id: "RX12369",
  },
  {
    _id: "26",
    date: "2025-01-05",
    source: "Product Sales",
    customer: "Customer Z",
    amount: 1200,
    description: "Product X",
    status: "Received",
    method: "Mpesa",
    payment_method: "Mpesa",
    payment_status: "Completed",
    transaction_id: "RX12370",
  },
  {
    _id: "27",
    date: "2025-02-10",
    source: "Service Fee",
    customer: "Customer A",
    amount: 8000,
    description: "Consulting Service",
    status: "Received",
    method: "Mpesa",
    payment_method: "Mpesa",
    payment_status: "Completed",
    transaction_id: "RX12371",
  },
  {
    _id: "28",
    date: "2025-03-15",
    source: "Subscription",
    customer: "Customer B",
    amount: 15000,
    description: "Monthly Subscription",
    status: "Received",
    method: "Mpesa",
    payment_method: "Mpesa",
    payment_status: "Completed",
    transaction_id: "RX12372",
  },
];

export default revenues;
