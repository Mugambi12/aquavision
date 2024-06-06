const settingsData = {
  _id: 1,
  company_logo: "path/to/logo.png",
  company_name: "Acme Corporation",
  company_address: "123 Main Street, Cityville",
  contact_number: "+1234567890",
  company_website_url: "https://www.acmecorp.com",
  company_description:
    "Acme Corporation is a leading provider of innovative solutions.",
  services: {
    unit_price: 100,
    service_fee: 20,
    house_sections: [
      {
        _id: 1,
        section: "Section A",
      },
      {
        _id: 2,
        section: "Section B",
      },
      {
        _id: 3,
        section: "Section C",
      },
      {
        _id: 4,
        section: "Section D",
      },
      {
        _id: 5,
        section: "Section E",
      },

      // Add more sections if needed
    ],
  },
  payments: [
    {
      bank_name: "Bank of America",
      paybill: 123456789,
      account_number: 987654321,
    },
    // Add more payment methods if needed
  ],
  mailConfig: {
    _id: 1,
    company_email: "info@acmecorp.com",
    mail_server: "mail.acmecorp.com",
    password: "mail_password",
  },
  socialAccounts: {
    _id: 1,
    whatsapp: "+1234567890",
    twitter: "@acmecorp",
    facebook: "acmecorporation",
    tiktok: "@acmecorp",
    instagram: "@acmecorp",
    linkedin: "acmecorporation",
    youtube: "acmecorporation",
  },
};

export default settingsData;
