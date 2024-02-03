const storedTasksString = localStorage.getItem('tasks');
const storedTasks = storedTasksString ? JSON.parse(storedTasksString) : getDefaultTasks();

localStorage.setItem('tasks', JSON.stringify(storedTasks));

function getDefaultTasks() {
  return [
    { 
      uuid: '0d5e15d8-5784-49c4-8e2e-41b80e27c8f3', 
      date: '2024-01-29', 
      title: '運動', 
      summary: '下午3點前往大安區健身房進行重訓課程，增強身體素質。', 
      address: '大安區健身房', 
      participant: '陳小明', 
      status: true, 
      priorityType: 'HIGH',
      thought: '今天的運動讓我感覺充滿活力，下次計劃增加重量。' 
    },
    { 
      uuid: 'c5a106b6-0520-4657-9e8b-336167271fac', 
      date: '2024-01-30', 
      title: '高中同學會', 
      summary: '晚上6點在西門町海鮮餐廳聚會，共度美好時光。', 
      address: '西門町海鮮餐廳', 
      participant: '高三同學', 
      status: true, 
      priorityType: 'MEDIUM',
      thought: '重逢老友讓我感到溫馨，下次計劃更頻繁的聚會。' 
    },
    { 
      uuid: '821ce791-710f-4ef2-8a23-4ebc010d43f1', 
      date: '2024-02-01', 
      title: '讀書', 
      summary: '上午10點前往總圖自習室，深入學習專業知識。', 
      address: '總圖自習室', 
      participant: '張三, 王五', 
      status: true, 
      priorityType: 'LOW',
      thought: '今天學到了很多新知識，下次繼續深入研究。' 
    },
    { 
      uuid: 'd35d1a48-4cf4-4f37-9a95-079423b1c80f', 
      date: '2024-02-02', 
      title: '旅行計畫', 
      summary: '中午12點在公司討論未來的旅行計畫，確定行程安排。', 
      address: '公司辦公室', 
      participant: '全體同仁', 
      status: false, 
      priorityType: 'MEDIUM',
      thought: '討論行程時，大家提出了很多有趣的建議，讓我們期待未來的旅行。'
    },
    { 
      uuid: 'e2c7e7bf-5f29-4f22-b34d-383c8298da70', 
      date: '2024-02-05', 
      title: '工作會議', 
      summary: '下午2點召開公司重要會議，討論業務發展方向。', 
      address: '公司會議室', 
      participant: '全體同仁', 
      status: false, 
      priorityType: 'HIGH',
      thought: '會議中針對業務發展提出了一些建議，希望可以在未來取得更大的進展。'
    },
    { 
      uuid: 'b6c8f77d-16e7-4f79-95cf-861d77872494', 
      date: '2024-02-08', 
      title: '家庭聚餐', 
      summary: '晚上7點在家中舉辦家庭聚餐，共度幸福時光。', 
      address: '家中', 
      participant: '家庭成員', 
      status: false, 
      priorityType: 'LOW',
      thought: '家庭聚餐是一天中最令人期待的時光，共享美食、歡笑和溫馨。今天大家都特地安排時間，共度一個溫馨的夜晚。菜色豐富，氣氛和諧，讓我感到非常幸福和滿足。'
    },
    { 
      uuid: '9cbeec42-d92b-45cd-b1e7-25d10df9943e', 
      date: '2024-02-10', 
      title: '學習新技能', 
      summary: '上午11點參加線上課程，學習最新的技術知識。', 
      address: '線上', 
      participant: '張三, 李四', 
      status: false, 
      priorityType: 'MEDIUM',
      thought: '學習新技能是不斷進步的一部分，這堂課程讓我對新技術有更深入的了解。'
    },
    { 
      uuid: '76bd14a8-7d9a-4ed0-b71a-7d00e4f4f6d2', 
      date: '2024-02-15', 
      title: '健康檢查', 
      summary: '早上9點前往醫院進行定期身體檢查，保持身體健康。', 
      address: '醫院', 
      participant: '個人', 
      status: false, 
      priorityType: 'HIGH',
      thought: '定期的健康檢查是維持身體健康的重要一環。今天的醫療檢查讓我更加了解自己的身體狀況，同時也提醒著我要更加珍惜健康，保持良好的生活習慣。'
    },
    { 
      uuid: 'a0ebe2d3-fb93-42b7-82fc-b27f2b672c15', 
      date: '2024-02-20', 
      title: '社區志工', 
      summary: '下午3點參與社區清潔活動，為社區環境盡一份心力。', 
      address: '社區中心', 
      participant: '社區志工團隊', 
      status: false, 
      priorityType: 'MEDIUM',
      thought: '參與社區清潔活動是我們每個人的責任，為社區盡一份心力，讓環境更加美好。'
    },
    { 
      uuid: '5d3931d4-4f58-4a78-843f-9b8e28bcb2d1', 
      date: '2024-02-25', 
      title: '會友聚餐', 
      summary: '晚上8點與朋友在五星級餐廳聚餐，品味美食。', 
      address: '五星級餐廳', 
      participant: '朋友們', 
      status: false, 
      priorityType: 'LOW',
      thought: '與朋友共度美食之夜，讓生活更加豐富多彩。'
    },
    { 
      uuid: 'b2cc1189-06d7-4c4a-89da-1ee21f926170', 
      date: '2024-03-01', 
      title: '學術研討會', 
      summary: '整天參與學術研討會，與同行學者交流學術見解。', 
      address: '大學會議廳', 
      participant: '學術界同仁', 
      status: false, 
      priorityType: 'HIGH',
      thought: '學術研討會是學術交流的平台，能夠深入了解同行的研究，激發思考。'
    },
    { 
      uuid: 'f16e2e92-2b14-4fbd-92ee-4d21a8a726e9', 
      date: '2024-03-05', 
      title: '生日慶祝', 
      summary: '晚上9點在友人家慶祝生日，歡樂共聚。', 
      address: '友人家', 
      participant: '友人', 
      status: false, 
      priorityType: 'MEDIUM',
      thought: '生日慶祝是一個感恩的時刻，與朋友共度讓我感到非常幸福和溫暖。'
    },
    { 
      uuid: 'f16e229262b14-4f22-b1e7-9b8ew8b9cbd1', 
      date: '2024-03-07', 
      title: '看連續劇', 
      summary: '晚上6點家看完連續劇第五季，享受一個人的時光。', 
      address: '家中', 
      participant: '無', 
      status: false, 
      priorityType: 'LOW',
      thought: '有時候獨處也是一種奢侈，看完連續劇後感到心情愉悅，讓我更加放鬆。'
    },
  ];
}
