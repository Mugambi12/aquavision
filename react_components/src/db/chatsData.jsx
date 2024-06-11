//const chat = [
//  {
//    _id: "Id",
//    participants: ["Id", "Id],
//    messages: [
//      {
//        _id: "Id",
//        sender_id: "Id",
//        content: "String",
//        timestamp: "Date",
//        is_read: "Boolean",
//      },
//    ],
//  },
//];

export const chats = [
  {
    _id: 1,
    participants: [
      {
        _id: 1,
        name: "Alice Johnson",
        status: "Online",
        profileImage: "https://fedskillstest.ct.digital/1.png",
      },
      {
        _id: 3,
        name: "You",
        status: "Offline",
        profileImage: "https://fedskillstest.ct.digital/3.png",
      },
    ],
    messages: [
      {
        _id: 1,
        sender: "You",
        content: "Hi, how are you?",
        timestamp: "10:30 AM",
        is_read: true,
      },
      {
        _id: 2,
        sender: "Alice Johnson",
        content: "I'm good, thank you.",
        timestamp: "10:32 AM",
        is_read: true,
      },
      {
        _id: 3,
        sender: "You",
        content: "What have you been up to lately?",
        timestamp: "10:35 AM",
        is_read: true,
      },
      {
        _id: 4,
        sender: "Alice Johnson",
        content: "Just working on some projects. How about you?",
        timestamp: "10:38 AM",
        is_read: true,
      },
      {
        _id: 5,
        sender: "You",
        content: "Same here. Got any exciting plans for the weekend?",
        timestamp: "10:40 AM",
        is_read: true,
      },
      {
        _id: 6,
        sender: "Alice Johnson",
        content: "Not really, just taking it easy. How about you?",
        timestamp: "10:42 AM",
        is_read: true,
      },
      {
        _id: 7,
        sender: "You",
        content: "Maybe catch up on some reading and go for a hike.",
        timestamp: "10:45 AM",
        is_read: true,
      },
      {
        _id: 8,
        sender: "Alice Johnson",
        content: "That sounds nice. I might do something similar.",
        timestamp: "10:48 AM",
        is_read: true,
      },
      {
        _id: 9,
        sender: "You",
        content: "Great minds think alike!",
        timestamp: "10:50 AM",
        is_read: true,
      },
      {
        _id: 10,
        sender: "Alice Johnson",
        content: "Haha, indeed!",
        timestamp: "10:52 AM",
        is_read: false,
      },
      // More messages...
    ],
  },
  {
    _id: 2,
    participants: [
      {
        _id: 2,
        name: "Bob Smith",
        status: "Online",
        profileImage: "https://fedskillstest.ct.digital/2.png",
      },
      {
        _id: 3,
        name: "You",
        status: "Online",
        profileImage: "https://fedskillstest.ct.digital/3.png",
      },
    ],
    messages: [
      {
        _id: 1,
        sender: "You",
        content: "Hey Bob, how's it going?",
        timestamp: "11:00 AM",
        is_read: true,
      },
      {
        _id: 2,
        sender: "Bob Smith",
        content: "Hey! I'm doing well, thanks. How about you?",
        timestamp: "11:02 AM",
        is_read: true,
      },
      {
        _id: 3,
        sender: "You",
        content:
          "Not too bad, just busy with work. Have any exciting plans for the weekend?",
        timestamp: "11:05 AM",
        is_read: true,
      },
      {
        _id: 4,
        sender: "Bob Smith",
        content:
          "Not really, just chilling at home. Maybe catch up on some movies. How about you?",
        timestamp: "11:08 AM",
        is_read: true,
      },
      {
        _id: 5,
        sender: "You",
        content:
          "Sounds relaxing. I'm thinking of going for a hike and doing some reading.",
        timestamp: "11:10 AM",
        is_read: true,
      },
      {
        _id: 6,
        sender: "Bob Smith",
        content: "Nice! That sounds like a great way to unwind.",
        timestamp: "11:12 AM",
        is_read: true,
      },
      // More messages...
    ],
  },
  {
    _id: 3,
    participants: [
      {
        _id: 4,
        name: "Emma Davis",
        status: "Online",
        profileImage: "https://fedskillstest.ct.digital/4.png",
      },
      {
        _id: 3,
        name: "You",
        status: "Online",
        profileImage: "https://fedskillstest.ct.digital/3.png",
      },
    ],
    messages: [
      {
        _id: 1,
        sender: "You",
        content: "Hi Emma! How's your day going?",
        timestamp: "12:00 PM",
        is_read: true,
      },
      {
        _id: 2,
        sender: "Emma Davis",
        content:
          "Hey! It's going pretty well, thanks for asking. How about you?",
        timestamp: "12:02 PM",
        is_read: true,
      },
      {
        _id: 3,
        sender: "You",
        content:
          "Not bad, just tackling some tasks. Any plans for the weekend?",
        timestamp: "12:05 PM",
        is_read: true,
      },
      {
        _id: 4,
        sender: "Emma Davis",
        content:
          "I'm meeting some friends for brunch and then probably just relaxing. How about you?",
        timestamp: "12:08 PM",
        is_read: true,
      },
      {
        _id: 5,
        sender: "You",
        content: "I might go for a hike and catch up on some reading.",
        timestamp: "12:10 PM",
        is_read: true,
      },
      {
        _id: 6,
        sender: "Emma Davis",
        content: "That sounds lovely! Enjoy your weekend.",
        timestamp: "12:12 PM",
        is_read: true,
      },
      // More messages...
    ],
  },
  {
    _id: 4,
    participants: [
      {
        _id: 5,
        name: "David Lee",
        status: "Offline",
        profileImage: "https://fedskillstest.ct.digital/5.png",
      },
      {
        _id: 3,
        name: "You",
        status: "Online",
        profileImage: "https://fedskillstest.ct.digital/3.png",
      },
    ],
    messages: [
      {
        _id: 1,
        sender: "You",
        content: "Hey David, how's everything going?",
        timestamp: "1:00 PM",
        is_read: true,
      },
      {
        _id: 2,
        sender: "David Lee",
        content: "Hey! Everything's good on my end, thanks. How about you?",
        timestamp: "1:02 PM",
        is_read: true,
      },
      {
        _id: 3,
        sender: "You",
        content: "Pretty good, just staying busy. Any plans for the weekend?",
        timestamp: "1:05 PM",
        is_read: true,
      },
      {
        _id: 4,
        sender: "David Lee",
        content:
          "Not much planned, probably just relax and catch up on some shows. How about you?",
        timestamp: "1:08 PM",
        is_read: true,
      },
      {
        _id: 5,
        sender: "You",
        content: "Thinking of going for a hike and doing some reading.",
        timestamp: "1:10 PM",
        is_read: true,
      },
      {
        _id: 6,
        sender: "David Lee",
        content: "Sounds like a nice way to unwind. Enjoy!",
        timestamp: "1:12 PM",
        is_read: true,
      },
      // More messages...
    ],
  },
  {
    _id: 5,
    participants: [
      {
        _id: 6,
        name: "Grace Brown",
        status: "Offline",
        profileImage: "https://fedskillstest.ct.digital/6.png",
      },
      {
        _id: 3,
        name: "You",
        status: "Online",
        profileImage: "https://fedskillstest.ct.digital/3.png",
      },
    ],
    messages: [
      {
        _id: 1,
        sender: "You",
        content: "Hi Grace! How are you doing?",
        timestamp: "2:00 PM",
        is_read: true,
      },
      {
        _id: 2,
        sender: "Grace Brown",
        content: "Hey! I'm doing well, thanks. How about you?",
        timestamp: "2:02 PM",
        is_read: true,
      },
      {
        _id: 3,
        sender: "You",
        content: "I'm good, just keeping busy. Any plans for the weekend?",
        timestamp: "2:05 PM",
        is_read: true,
      },
      {
        _id: 4,
        sender: "Grace Brown",
        content: "Not much planned, just relaxing. How about you?",
        timestamp: "2:08 PM",
        is_read: true,
      },
      {
        _id: 5,
        sender: "You",
        content:
          "Thinking of going for a hike and catching up on some reading.",
        timestamp: "2:10 PM",
        is_read: true,
      },
      {
        _id: 6,
        sender: "Grace Brown",
        content: "Sounds like a nice way to spend the weekend.",
        timestamp: "2:12 PM",
        is_read: true,
      },
      // More messages...
    ],
  },
  {
    _id: 6,
    participants: [
      {
        _id: 7,
        name: "Henry Wilson",
        status: "Offline",
        profileImage: "https://fedskillstest.ct.digital/7.png",
      },
      {
        _id: 3,
        name: "You",
        status: "Online",
        profileImage: "https://fedskillstest.ct.digital/3.png",
      },
    ],
    messages: [
      {
        _id: 1,
        sender: "You",
        content: "Hi Henry! How are you doing?",
        timestamp: "3:00 PM",
        is_read: true,
      },
      {
        _id: 2,
        sender: "Henry Wilson",
        content: "Hey! I'm doing well, thanks. How about you?",
        timestamp: "3:02 PM",
        is_read: true,
      },
      {
        _id: 3,
        sender: "You",
        content: "I'm good, just keeping busy. Any plans for the weekend?",
        timestamp: "3:05 PM",
        is_read: true,
      },
      {
        _id: 4,
        sender: "Henry Wilson",
        content: "Not much planned, just relaxing. How about you?",
        timestamp: "3:08 PM",
        is_read: true,
      },
      {
        _id: 5,
        sender: "You",
        content:
          "Thinking of going for a hike and catching up on some reading.",
        timestamp: "3:10 PM",
        is_read: true,
      },
      {
        _id: 6,
        sender: "Henry Wilson",
        content: "Sounds like a nice way to spend the weekend.",
        timestamp: "3:12 PM",
        is_read: true,
      },
      // More messages...
    ],
  },

  // More chats...
];
