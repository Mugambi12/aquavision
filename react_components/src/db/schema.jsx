const data = [
  {
    users: [
      {
        id: "ObjectId1",
        name: "String",
        email: "String",
        phone_number: "String",
        password_hash: "String",
        house_section: "String",
        house_number: "String",
        profile_image: "String",
        is_active: "Boolean",
        is_admin: "Boolean",
        balance: "Number",
        last_login: "Date",
        last_logout: "Date",
        password_reset_tokens: [
          {
            id: "ObjectId1",
            token: "String",
            created_at: "Date",
          },
        ],
        notes: [
          {
            id: "ObjectId1",
            content: "String",
          },
        ],
        billing_entries: [
          {
            id: "ObjectId1",
            date: "Date",
            reading_value: "Number",
            consumed: "Number",
            unit_price: "Number",
            service_fee: "Number",
            total_amount: "Number",
            payment_status: "String",
          },
        ],
        payments: [
          {
            id: "ObjectId1",
            date: "Date",
            invoiceid: "ObjectId1",
            amount: "Number",
            payment_method: "String",
            transaction_id: "String",
            status: "String",
          },
        ],
      },
    ],
    expenses: [
      {
        id: "ObjectId1",
        date: "Date",
        type: "String",
        vendor: "String",
        amount: "Number",
        description: "String",
        status: "String",
        payment_method: "String",
        payment_status: "String",
        transaction_id: "String",
        status: "String",
      },
    ],
    settings: [
      {
        id: "ObjectId",
        company_logo: "String",
        company_name: "String",
        company_address: "String",
        company_email: "String",
        contact_number: "String",
        company_website_url: "String",
        company_description: "String",
        services: {
          unit_price: "Number",
          service_fee: "Number",
          house_sections: [
            {
              id: "ObjectId",
              section: "String",
            },
          ],
        },
        payments: [
          {
            id: "ObjectId",
            bank_name: "String",
            paybill: "Number",
            account_number: "Number",
          },
        ],
        mailConfig: {
          id: "ObjectId",
          company_email: "String",
          mail_server: "String",
          password: "String",
        },
        socialAccounts: {
          id: "ObjectId",
          whatsapp: "String",
          twitter: "String",
          facebook: "String",
          tiktok: "String",
          instagram: "String",
          linkedin: "String",
          youtube: "String",
        },
      },
    ],
    feedback: [
      {
        id: "ObjectId",
        name: "ObjectId",
        email: "ObjectId",
        phone_number: "ObjectId",
        content: "String",
        date: "Date",
        status: "String",
      },
    ],
    chats: [
      {
        _id: "ObjectId",
        type: "String",
        participants: ["ObjectId"],
        messages: [
          {
            _id: "ObjectId",
            sender_id: "ObjectId",
            content: "String",
            timestamp: "Date",
            is_read: "Boolean",
          },
        ],
      },
    ],
  },
];
