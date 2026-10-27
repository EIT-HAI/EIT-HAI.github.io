window.EXPERIMENTS = {
  "robot": [
    {
      "id": "01",
      "title": {
        "en": "Tabletop cleanup",
        "zh": "固定站位桌面收纳"
      },
      "task": {
        "en": "Place the green cube, fruit and grape bunch into the pink plate.",
        "zh": "把绿色方块、绿色水果与整串葡萄放进粉色盘子。"
      },
      "result": {
        "en": "All three objects were in the plate.",
        "zh": "三件物体均留在盘内。"
      },
      "media": [
        {
          "type": "video",
          "src": "assets/media/web-h264-v1/01_tabletop_50x.mp4",
          "poster": "assets/images/01_tabletop_final.jpg",
          "en": "Head camera · 50×",
          "zh": "头部相机 · 50 倍速"
        }
      ]
    },
    {
      "id": "02",
      "title": {
        "en": "Move, then manipulate",
        "zh": "移动后桌面收纳"
      },
      "task": {
        "en": "Approach the table, then place the three objects into the plate.",
        "zh": "靠近桌子，再将三件物体放进盘子。"
      },
      "result": {
        "en": "The base approached and all three objects were placed in the plate.",
        "zh": "底盘靠近后，三件物体均放入盘内。"
      },
      "media": [
        {
          "type": "video",
          "src": "assets/media/web-h264-v1/02_mobile_50x.mp4",
          "poster": "assets/images/02_mobile_final.jpg",
          "en": "Third-person view · 50×",
          "zh": "第三视角 · 50 倍速"
        }
      ]
    },
    {
      "id": "03",
      "title": {
        "en": "Drawer retrieval and closure",
        "zh": "抽屉取物与关闭"
      },
      "task": {
        "en": "Open the upper drawer, retrieve the cube, place it on top and close the drawer.",
        "zh": "打开上层抽屉，取出方块放至柜顶，再关闭抽屉。"
      },
      "result": {
        "en": "The cube remained on the cabinet top and the upper drawer was visually closed.",
        "zh": "方块留在柜顶，上层抽屉在图像中闭合。"
      },
      "media": [
        {
          "type": "video",
          "src": "assets/media/web-h264-v1/03_cabinet_50x.mp4",
          "poster": "assets/images/03_cabinet_final.jpg",
          "en": "Head camera · 50× · Two sessions",
          "zh": "头部相机 · 50 倍速 · 两次会话拼接"
        }
      ]
    },
    {
      "id": "04",
      "title": {
        "en": "Single loaded transfer",
        "zh": "一次载物整体搬运"
      },
      "task": {
        "en": "Carry the bowl and cube to the round table in one loaded trip.",
        "zh": "将碗和方块一次运送至圆桌。"
      },
      "result": {
        "en": "The cube was carried inside the bowl. Both remained on the destination table.",
        "zh": "方块装入碗内一起搬运，两件物体均留在目标圆桌。"
      },
      "media": [
        {
          "type": "video",
          "src": "assets/media/web-h264-v1/04_single_trip_transfer_50x.mp4",
          "poster": "assets/images/04_single_trip_transfer_final.jpg",
          "en": "Head camera · 50×",
          "zh": "头部相机 · 50 倍速"
        }
      ]
    }
  ],
  "revo": [
    {
      "id": "01",
      "title": {
        "en": "Single-finger control",
        "zh": "单指往返控制"
      },
      "result": {
        "en": "Index-finger feedback: 50 → 149 → 50 on the SDK's 0–1000 scale. Other fingers' readings did not change.",
        "zh": "食指实测 50 → 149 → 50（SDK 0–1000 刻度），其余手指读数未变。"
      },
      "media": [
        {
          "type": "image",
          "src": "assets/images/revo2-s1_visible.jpg",
          "en": "Recorded control test",
          "zh": "控制测试记录"
        }
      ]
    },
    {
      "id": "02",
      "title": {
        "en": "Cup-rim lift",
        "zh": "杯沿试抬"
      },
      "result": {
        "en": "The wrist rose about 7.58 mm in each of two attempts. The cup remained on the plate.",
        "zh": "两次试抬中腕部均上升约 7.58 mm，杯子仍留在盘上。"
      },
      "media": [
        {
          "type": "video",
          "src": "assets/media/web-h264-v1/revo2-s2_lift2.mp4",
          "poster": "assets/images/revo2-s2_lift2_poster.jpg",
          "en": "Second lift attempt · 11.65 s",
          "zh": "第二次试抬 · 11.65 秒"
        }
      ]
    },
    {
      "id": "03",
      "title": {
        "en": "Side-grasp lift",
        "zh": "侧握试抬"
      },
      "result": {
        "en": "The wrist rose 7.234 mm after the plate was moved. The cup did not leave the table.",
        "zh": "移盘后试抬，腕部上升 7.234 mm，杯子未离台。"
      },
      "media": [
        {
          "type": "video",
          "src": "assets/media/web-h264-v1/revo2-s3_lift.mp4",
          "poster": "assets/images/revo2-s3_lift_poster.jpg",
          "en": "Side-grasp lift · 11.67 s",
          "zh": "侧握试抬 · 11.67 秒"
        },
        {
          "type": "image",
          "src": "assets/images/revo2-s3_contact.jpg",
          "en": "Recorded contact view",
          "zh": "接触画面"
        }
      ]
    },
    {
      "id": "04",
      "title": {
        "en": "Hand geometry validation",
        "zh": "手部几何核查"
      },
      "result": {
        "en": "Fixed-shape reference-point RMS: 1.35–2.20 mm. After finger closure: overall RMS 5.26 mm, maximum 9.57 mm.",
        "zh": "固定手型参考点 RMS 为 1.35–2.20 mm。闭指后整体 RMS 为 5.26 mm，最大误差 9.57 mm。"
      },
      "media": [
        {
          "type": "image",
          "src": "assets/images/revo2-s4_validate.jpg",
          "en": "Geometry validation",
          "zh": "几何核查"
        },
        {
          "type": "image",
          "src": "assets/images/revo2-s4_shape.jpg",
          "en": "Changed hand shape",
          "zh": "手型变化"
        }
      ]
    },
    {
      "id": "5A",
      "title": {
        "en": "Wrap grasp: tilted cup",
        "zh": "包握试验：杯体倾斜"
      },
      "result": {
        "en": "The cup moved with the hand, tilted and fell onto its side when replaced.",
        "zh": "杯子随手运动后逐渐倾斜，放回时侧倒。"
      },
      "media": [
        {
          "type": "video",
          "src": "assets/media/web-h264-v1/revo2-s5_tilt.mp4",
          "poster": "assets/images/revo2-s5_tilt_poster.jpg",
          "en": "Wrap-grasp attempt · 21.10 s",
          "zh": "包握尝试 · 21.10 秒"
        },
        {
          "type": "image",
          "src": "assets/images/revo2-s5_fall.jpg",
          "en": "Cup after replacement",
          "zh": "放回后的杯子"
        }
      ]
    },
    {
      "id": "5B",
      "title": {
        "en": "Upright hold",
        "zh": "直立离台保持"
      },
      "result": {
        "en": "45 observations covered 5.859 s of upright hold. Visible lower-edge rise was estimated at 12.3–16.3 mm.",
        "zh": "45 帧观测覆盖 5.859 秒直立保持，杯体可见下沿抬升估计为 12.3–16.3 mm。"
      },
      "media": [
        {
          "type": "video",
          "src": "assets/media/web-h264-v1/revo2-s5_hold_head.mp4",
          "poster": "assets/images/revo2-s5_hold_head_poster.jpg",
          "en": "Head camera · 20.92 s",
          "zh": "头部视角 · 20.92 秒"
        },
        {
          "type": "video",
          "src": "assets/media/web-h264-v1/revo2-s5_hold_torso.mp4",
          "poster": "assets/images/revo2-s5_hold_torso_poster.jpg",
          "en": "Torso camera · 21.02 s",
          "zh": "躯干视角 · 21.02 秒"
        },
        {
          "type": "image",
          "src": "assets/images/revo2-s5_success_torso.jpg",
          "en": "Upright-hold observation",
          "zh": "直立保持画面"
        }
      ]
    },
    {
      "id": "06",
      "title": {
        "en": "Same-cup transfer",
        "zh": "同杯重抓与搬运"
      },
      "result": {
        "en": "One transfer was completed with no in-trial manual reset. The cup stood upright after release and hand withdrawal.",
        "zh": "完成一次搬运，轮内人工复位 0 次。释放并退手后，杯子独立直立。"
      },
      "media": [
        {
          "type": "video",
          "src": "assets/media/web-h264-v1/revo2-s6-transfer-clean.mp4",
          "poster": "assets/images/revo2-s6-transfer-clean-poster.jpg",
          "en": "Two-view clean export · 2:22",
          "zh": "双视角无字版 · 2 分 22 秒"
        },
        {
          "type": "video",
          "src": "assets/media/web-h264-v1/revo2-s6-full-clean.mp4",
          "poster": "assets/images/revo2-s6-full-clean-poster.jpg",
          "en": "Complete clean record · 13 evidence-gap cuts · 18:51",
          "zh": "完整无字记录 · 13 处缺录跳切 · 18 分 51 秒"
        },
        {
          "type": "image",
          "src": "assets/images/revo2-s6_followup.jpg",
          "en": "Destination observation",
          "zh": "目标位置画面"
        }
      ]
    }
  ],
  "navigation": [
    {
      "id": "astra-supernav-1",
      "family": "supernav",
      "rank": 1,
      "condition": "astra",
      "episode": "multi_objectnav_17_000107",
      "success": false,
      "stages": 4,
      "total": 5,
      "actions": 498,
      "stop": "policy_stop",
      "image": "assets/images/nav-astra-supernav-1.png",
"video": "assets/media/web-h264-v1/astra-supernav-1-multiview.mp4",
      "videoPoster": "assets/media/navigation-multiview-r3/astra-supernav-1-poster.jpg",
      "replayFrames": 42,
      "replayFps": 1,
      "instruction": "First, find a wooden kitchen counter with a light-colored surface between two wooden stools and a shelf. Then, find a gray bathroom vanity with wooden base visible through the doorway beside a wardrobe with robes. Then, find a hanging fabric with black and white patterns mounted on a rod near a table. Then, find a tall wooden open wardrobe with hanging white bathrobes positioned beside the bathroom archway. Finally, find the indoor plant has green leaves, a tall shape, and is located near a white counter, beside a window."
    },
    {
      "id": "astra-supernav-2",
      "family": "supernav",
      "rank": 2,
      "condition": "astra",
      "episode": "multi_objectnav_17_000186",
      "success": true,
      "stages": 5,
      "total": 5,
      "actions": 436,
      "stop": "policy_stop",
      "image": "assets/images/nav-astra-supernav-2.png",
      "video": "assets/media/web-h264-v1/astra-supernav-2-multiview.mp4",
      "videoPoster": "assets/media/navigation-multiview-r3/astra-supernav-2-poster.jpg",
      "replayFrames": 43,
      "replayFps": 1,
      "instruction": "First, find the black upright piano topped with purple flowers beside the white chaise lounge. Then, find a modern lounge chair with white fabric and sleek design near a side table and window. Then, find an accent chair with tan fabric, modern shape next to a glass cabinet. Then, find an armchair with white fabric, cushioned seating, next to a coffee table and shelves. Finally, find a decorative plant with green leaves and slender branches on a coffee table, near a sofa."
    },
    {
      "id": "astra-supernav-3",
      "family": "supernav",
      "rank": 3,
      "condition": "astra",
      "episode": "multi_objectnav_17_000050",
      "success": true,
      "stages": 5,
      "total": 5,
      "actions": 299,
      "stop": "policy_stop",
      "image": "assets/images/nav-astra-supernav-3.png",
      "video": "assets/media/web-h264-v1/astra-supernav-3-multiview.mp4",
      "videoPoster": "assets/media/navigation-multiview-r3/astra-supernav-3-poster.jpg",
      "replayFrames": 29,
      "replayFps": 1,
      "instruction": "First, find the curved light wood reception desk with the mint green light strip. Then, find the wall decorated with the hot air balloon and cloud stickers. Then, find a dark green plush animal shaped stool on the wooden floor beside a curved green sofa. Then, find a colorful wooden toy train placed in the center of a play area. Finally, find a playhouse structure with red wooden walls and a triangular shape in a corner with shelves nearby."
    },
    {
      "id": "graph-lhpr-1",
      "family": "lhpr",
      "rank": 1,
      "condition": "graph",
      "episode": "batch_7_episode_episode_120",
      "success": false,
      "stages": 0,
      "total": 2,
      "actions": 500,
      "stop": "navigation_action_limit",
      "image": "assets/images/nav-graph-lhpr-1.png",
      "video": "assets/media/web-h264-v1/graph-lhpr-1-multiview.mp4",
      "videoPoster": "assets/media/navigation-multiview-r3/graph-lhpr-1-poster.jpg",
      "replayFrames": 59,
      "replayFps": 1,
      "instruction": "Take the decorative plant from the hall to the coffee table in the living room"
    },
    {
      "id": "graph-lhpr-2",
      "family": "lhpr",
      "rank": 2,
      "condition": "graph",
      "episode": "batch_1_episode_episode_20",
      "success": false,
      "stages": 0,
      "total": 3,
      "actions": 500,
      "stop": "navigation_action_limit",
      "image": "assets/images/nav-graph-lhpr-2.png",
      "video": "assets/media/web-h264-v1/graph-lhpr-2-multiview.mp4",
      "videoPoster": "assets/media/navigation-multiview-r3/graph-lhpr-2-poster.jpg",
      "replayFrames": 56,
      "replayFps": 1,
      "instruction": "take the bath towel in bedroom to the laundry basket in bathroom, then retrieve a bag from the kitchen"
    },
    {
      "id": "graph-lhpr-3",
      "family": "lhpr",
      "rank": 3,
      "condition": "graph",
      "episode": "batch_8_episode_episode_74",
      "success": false,
      "stages": 0,
      "total": 3,
      "actions": 226,
      "stop": "sequence_submitted",
      "image": "assets/images/nav-graph-lhpr-3.png",
      "video": "assets/media/web-h264-v1/graph-lhpr-3-multiview.mp4",
      "videoPoster": "assets/media/navigation-multiview-r3/graph-lhpr-3-poster.jpg",
      "replayFrames": 39,
      "replayFps": 1,
      "instruction": "Take the decorative plant in the kitchen to the table in the living room, then pick up the remote control from the living room"
    },
    {
      "id": "graph-supernav-1",
      "family": "supernav",
      "rank": 1,
      "condition": "graph",
      "episode": "multi_objectnav_17_000107",
      "success": true,
      "stages": 5,
      "total": 5,
      "actions": 470,
      "stop": "policy_stop",
      "image": "assets/images/nav-graph-supernav-1.png",
      "video": "assets/media/web-h264-v1/graph-supernav-1-multiview.mp4",
      "videoPoster": "assets/media/navigation-multiview-r3/graph-supernav-1-poster.jpg",
      "replayFrames": 48,
      "replayFps": 1,
      "instruction": "First, find a wooden kitchen counter with a light-colored surface between two wooden stools and a shelf. Then, find a gray bathroom vanity with wooden base visible through the doorway beside a wardrobe with robes. Then, find a hanging fabric with black and white patterns mounted on a rod near a table. Then, find a tall wooden open wardrobe with hanging white bathrobes positioned beside the bathroom archway. Finally, find the indoor plant has green leaves, a tall shape, and is located near a white counter, beside a window."
    },
    {
      "id": "graph-supernav-2",
      "family": "supernav",
      "rank": 2,
      "condition": "graph",
      "episode": "multi_objectnav_17_000186",
      "success": true,
      "stages": 5,
      "total": 5,
      "actions": 500,
      "stop": "policy_stop",
      "image": "assets/images/nav-graph-supernav-2.png",
      "video": "assets/media/web-h264-v1/graph-supernav-2-multiview.mp4",
      "videoPoster": "assets/media/navigation-multiview-r3/graph-supernav-2-poster.jpg",
      "replayFrames": 45,
      "replayFps": 1,
      "instruction": "First, find the black upright piano topped with purple flowers beside the white chaise lounge. Then, find a modern lounge chair with white fabric and sleek design near a side table and window. Then, find an accent chair with tan fabric, modern shape next to a glass cabinet. Then, find an armchair with white fabric, cushioned seating, next to a coffee table and shelves. Finally, find a decorative plant with green leaves and slender branches on a coffee table, near a sofa."
    },
    {
      "id": "graph-supernav-3",
      "family": "supernav",
      "rank": 3,
      "condition": "graph",
      "episode": "multi_objectnav_17_000050",
      "success": true,
      "stages": 5,
      "total": 5,
      "actions": 277,
      "stop": "policy_stop",
      "image": "assets/images/nav-graph-supernav-3.png",
      "video": "assets/media/web-h264-v1/graph-supernav-3-multiview.mp4",
      "videoPoster": "assets/media/navigation-multiview-r3/graph-supernav-3-poster.jpg",
      "replayFrames": 26,
      "replayFps": 1,
      "instruction": "First, find the curved light wood reception desk with the mint green light strip. Then, find the wall decorated with the hot air balloon and cloud stickers. Then, find a dark green plush animal shaped stool on the wooden floor beside a curved green sofa. Then, find a colorful wooden toy train placed in the center of a play area. Finally, find a playhouse structure with red wooden walls and a triangular shape in a corner with shelves nearby."
    },
    {
      "id": "astra-lhpr-1",
      "family": "lhpr",
      "rank": 1,
      "condition": "astra",
      "episode": "batch_7_episode_episode_120",
      "success": false,
      "stages": 1,
      "total": 2,
      "actions": 281,
      "stop": "sequence_submitted",
      "image": "assets/images/nav-astra-lhpr-1.png",
      "video": "assets/media/web-h264-v1/astra-lhpr-1-multiview.mp4",
      "videoPoster": "assets/media/navigation-multiview-r3/astra-lhpr-1-poster.jpg",
      "replayFrames": 44,
      "replayFps": 1,
      "instruction": "Take the decorative plant from the hall to the coffee table in the living room"
    },
    {
      "id": "astra-lhpr-2",
      "family": "lhpr",
      "rank": 2,
      "condition": "astra",
      "episode": "batch_1_episode_episode_20",
      "success": false,
      "stages": 0,
      "total": 3,
      "actions": 500,
      "stop": "navigation_action_limit",
      "image": "assets/images/nav-astra-lhpr-2.png",
      "video": "assets/media/web-h264-v1/astra-lhpr-2-multiview.mp4",
      "videoPoster": "assets/media/navigation-multiview-r3/astra-lhpr-2-poster.jpg",
      "replayFrames": 61,
      "replayFps": 1,
      "instruction": "take the bath towel in bedroom to the laundry basket in bathroom, then retrieve a bag from the kitchen"
    },
    {
      "id": "astra-lhpr-3",
      "family": "lhpr",
      "rank": 3,
      "condition": "astra",
      "episode": "batch_8_episode_episode_74",
      "success": false,
      "stages": 0,
      "total": 3,
      "actions": 351,
      "stop": "sequence_submitted",
      "image": "assets/images/nav-astra-lhpr-3.png",
      "video": "assets/media/web-h264-v1/astra-lhpr-3-multiview.mp4",
      "videoPoster": "assets/media/navigation-multiview-r3/astra-lhpr-3-poster.jpg",
      "replayFrames": 52,
      "replayFps": 1,
      "instruction": "Take the decorative plant in the kitchen to the table in the living room, then pick up the remote control from the living room"
    },
    {
      "id": "eval-lhpr-1",
      "family": "lhpr",
      "rank": 1,
      "condition": "eval",
      "episode": "batch_7_episode_episode_120",
      "success": false,
      "stages": 0,
      "total": 2,
      "actions": 500,
      "stop": "navigation_action_limit",
      "image": "assets/images/nav-eval-lhpr-1.png",
      "video": "assets/media/web-h264-v1/eval-lhpr-1-multiview.mp4",
      "videoPoster": "assets/media/navigation-multiview-r3/eval-lhpr-1-poster.jpg",
      "replayFrames": 57,
      "replayFps": 1,
      "instruction": "Take the decorative plant from the hall to the coffee table in the living room"
    },
    {
      "id": "eval-lhpr-2",
      "family": "lhpr",
      "rank": 2,
      "condition": "eval",
      "episode": "batch_1_episode_episode_20",
      "success": false,
      "stages": 0,
      "total": 3,
      "actions": 500,
      "stop": "navigation_action_limit",
      "image": "assets/images/nav-eval-lhpr-2.png",
      "video": "assets/media/web-h264-v1/eval-lhpr-2-multiview.mp4",
      "videoPoster": "assets/media/navigation-multiview-r3/eval-lhpr-2-poster.jpg",
      "replayFrames": 64,
      "replayFps": 1,
      "instruction": "take the bath towel in bedroom to the laundry basket in bathroom, then retrieve a bag from the kitchen"
    },
    {
      "id": "eval-lhpr-3",
      "family": "lhpr",
      "rank": 3,
      "condition": "eval",
      "episode": "batch_8_episode_episode_74",
      "success": false,
      "stages": 0,
      "total": 3,
      "actions": 500,
      "stop": "navigation_action_limit",
      "image": "assets/images/nav-eval-lhpr-3.png",
      "video": "assets/media/web-h264-v1/eval-lhpr-3-multiview.mp4",
      "videoPoster": "assets/media/navigation-multiview-r3/eval-lhpr-3-poster.jpg",
      "replayFrames": 86,
      "replayFps": 1,
      "instruction": "Take the decorative plant in the kitchen to the table in the living room, then pick up the remote control from the living room"
    },
    {
      "id": "eval-supernav-1",
      "family": "supernav",
      "rank": 1,
      "condition": "eval",
      "episode": "multi_objectnav_17_000107",
      "success": false,
      "stages": 4,
      "total": 5,
      "actions": 500,
      "stop": "navigation_action_limit",
      "image": "assets/images/nav-eval-supernav-1.png",
      "video": "assets/media/web-h264-v1/eval-supernav-1-multiview.mp4",
      "videoPoster": "assets/media/navigation-multiview-r3/eval-supernav-1-poster.jpg",
      "replayFrames": 62,
      "replayFps": 1,
      "instruction": "First, find a wooden kitchen counter with a light-colored surface between two wooden stools and a shelf. Then, find a gray bathroom vanity with wooden base visible through the doorway beside a wardrobe with robes. Then, find a hanging fabric with black and white patterns mounted on a rod near a table. Then, find a tall wooden open wardrobe with hanging white bathrobes positioned beside the bathroom archway. Finally, find the indoor plant has green leaves, a tall shape, and is located near a white counter, beside a window."
    },
    {
      "id": "eval-supernav-2",
      "family": "supernav",
      "rank": 2,
      "condition": "eval",
      "episode": "multi_objectnav_17_000186",
      "success": false,
      "stages": 5,
      "total": 5,
      "actions": 500,
      "stop": "navigation_action_limit",
      "image": "assets/images/nav-eval-supernav-2.png",
      "video": "assets/media/web-h264-v1/eval-supernav-2-multiview.mp4",
      "videoPoster": "assets/media/navigation-multiview-r3/eval-supernav-2-poster.jpg",
      "replayFrames": 63,
      "replayFps": 1,
      "instruction": "First, find the black upright piano topped with purple flowers beside the white chaise lounge. Then, find a modern lounge chair with white fabric and sleek design near a side table and window. Then, find an accent chair with tan fabric, modern shape next to a glass cabinet. Then, find an armchair with white fabric, cushioned seating, next to a coffee table and shelves. Finally, find a decorative plant with green leaves and slender branches on a coffee table, near a sofa."
    },
    {
      "id": "eval-supernav-3",
      "family": "supernav",
      "rank": 3,
      "condition": "eval",
      "episode": "multi_objectnav_17_000050",
      "success": false,
      "stages": 4,
      "total": 5,
      "actions": 500,
      "stop": "navigation_action_limit",
      "image": "assets/images/nav-eval-supernav-3.png",
      "video": "assets/media/web-h264-v1/eval-supernav-3-multiview.mp4",
      "videoPoster": "assets/media/navigation-multiview-r3/eval-supernav-3-poster.jpg",
      "replayFrames": 50,
      "replayFps": 1,
      "instruction": "First, find the curved light wood reception desk with the mint green light strip. Then, find the wall decorated with the hot air balloon and cloud stickers. Then, find a dark green plush animal shaped stool on the wooden floor beside a curved green sofa. Then, find a colorful wooden toy train placed in the center of a play area. Finally, find a playhouse structure with red wooden walls and a triangular shape in a corner with shelves nearby."
    }
  ]
};
