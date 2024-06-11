const data = [
  {
    users: [
      {
        id: 1,
        name: "John Doe",
        email: "john.doe@example.com",
        phone_number: "+1234567890",
        password_hash: "hashedPassword123",
        house_section: "Section A",
        house_number: "123",
        profile_image: "https://example.com/profile.jpg",
        is_active: true,
        is_admin: false,
        balance: 1000,
        last_login: new Date("2024-06-01T08:00:00Z"),
        last_logout: new Date("2024-06-01T17:00:00Z"),
        password_reset_tokens: [
          {
            id: 1,
            token: "resetToken123",
            created_at: new Date("2024-06-01T10:00:00Z"),
          },
        ],
        notes: [
          {
            id: 1,
            content: "Reminder: Pay utility bill",
          },
        ],
        billing_entries: [
          {
            id: 1,
            date: new Date("2024-05-31T00:00:00Z"),
            reading_value: 1000,
            consumed: 50,
            unit_price: 10,
            service_fee: 5,
            total_amount: 525,
            payment_status: "Paid",
          },
        ],
        payments: [
          {
            id: 1,
            date: new Date("2024-06-01T12:00:00Z"),
            invoiceid: 1,
            amount: 525,
            payment_method: "Credit Card",
            transaction_id: "transaction123",
            status: "Success",
          },
        ],
      },
    ],
    expenses: [
      {
        id: 1,
        date: new Date("2024-06-01T09:00:00Z"),
        type: "Maintenance",
        vendor: "ABC Hardware Store",
        amount: 50,
        description: "Purchase of plumbing materials",
        status: "Paid",
        payment_method: "Cash",
        payment_status: "Success",
        transaction_id: "transaction456",
      },
    ],
    settings: [
      {
        id: 1,
        company_logo: "https://example.com/logo.png",
        company_name: "XYZ Property Management",
        company_address: "123 Main Street, Cityville",
        company_email: "info@xyzproperty.com",
        contact_number: "+1234567890",
        company_website_url: "https://www.xyzproperty.com",
        company_description: "Your trusted property management company",
        services: {
          unit_price: 10,
          service_fee: 5,
          house_sections: [
            {
              id: 1,
              section: "Section A",
            },
          ],
        },
        payments: [
          {
            id: 1,
            bank_name: "ABC Bank",
            paybill: 12345,
            account_number: 67890,
          },
        ],
        mailConfig: {
          id: 1,
          company_email: "info@xyzproperty.com",
          mail_server: "smtp.xyzproperty.com",
          password: "mailPassword123",
        },
        socialAccounts: {
          id: 1,
          whatsapp: "+1234567890",
          twitter: "https://twitter.com/xyzproperty",
          facebook: "https://www.facebook.com/xyzproperty",
          tiktok: "https://www.tiktok.com/@xyzproperty",
          instagram: "https://www.instagram.com/xyzproperty",
          linkedin: "https://www.linkedin.com/company/xyzproperty",
          youtube: "https://www.youtube.com/channel/xyzproperty",
        },
      },
    ],
    feedback: [
      {
        id: 1,
        name: "Jane Smith",
        email: "jane.smith@example.com",
        phone_number: "+1987654321",
        content: "Great service, very responsive!",
        date: new Date("2024-06-01T14:00:00Z"),
        status: "Pending",
      },
    ],
    chats: [
      {
        id: 1,
        type: "individual",
        participants: [1, 2],
        messages: [
          {
            id: 1,
            sender_id: 1,
            content: "Hi there!",
            timestamp: new Date("2024-06-01T15:00:00Z"),
            is_read: true,
          },
          {
            id: 1,
            sender_id: 2,
            content: "Hello!",
            timestamp: new Date("2024-06-01T15:05:00Z"),
            is_read: true,
          },
        ],
      },
      {
        id: 1,
        type: "group",
        participants: [1, 3, 4],
        messages: [
          {
            id: 1,
            sender_id: 1,
            content: "Meeting tomorrow at 10 AM.",
            timestamp: new Date("2024-06-01T16:00:00Z"),
            read_by: [1, 3],
          },
          {
            id: 1,
            sender_id: 3,
            content: "Sure, I'll be there!",
            timestamp: new Date("2024-06-01T16:05:00Z"),
            read_by: [1, 3, 4],
          },
          {
            id: 1,
            sender_id: 4,
            content: "Count me in!",
            timestamp: new Date("2024-06-01T16:10:00Z"),
            read_by: [1, 3, 4],
          },
        ],
      },
    ],
  },
];
