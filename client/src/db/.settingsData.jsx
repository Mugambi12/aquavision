const settingsData = {
  _id: 1,
  company_logo: "https://fedskillstest.ct.digital/1.png",
  company_name: "Dakoke Springs",
  company_address: "123 Main Street, Cityville",
  contact_number: "+1234567890",
  company_website_url: "https://www.dakokesprings.com",
  company_description:
    "Dakoke Springs is a leading provider of quality water in the region.",
  services: {
    unit_price: 300,
    service_fee: 200,
    house_sections: [
      {
        _id: 1,
        section: "Osupuko",
      },
      {
        _id: 2,
        section: "Chui Lane",
      },
      {
        _id: 3,
        section: "Villa",
      },
      {
        _id: 4,
        section: "Phase 3",
      }
    ],
  },
  payments: [
    {
      bank_name: "Cooperative Bank",
      paybill_number: 123456789,
      account_number: 987654321,
    },
  ],
  mailConfig: {
    _id: 1,
    company_email: "info@acmecorp.com",
    mail_server: "mail.gmail.com",
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
