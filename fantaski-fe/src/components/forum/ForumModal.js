import React from "react";
import { Modal, Button } from "react-bootstrap";
import ForumThreeDot from "./ForumThreeDot";
import { IMAGE_FORUM_URL } from "../../config/url";
import ForumHeartCommit from "./ForumHeartCommit";
import { BsHeartFill } from "react-icons/bs";
import ForumCommit from "./ForumCommit";

// 需做登入狀態判斷，是該帳號登入時，會顯示 threeDot

function ForumModal(props) {
  return (
    <Modal {...props} size="lg" aria-labelledby="forumModalView" centered>
      <Modal.Header closeButton>
        <Modal.Title id="forumModalView">
          <div className="forum-user-img">
            {/* 需規範上傳圖片的限制檔名與K數 */}
            <img src={`${IMAGE_FORUM_URL}/snowman.svg`} alt="snowman-defult" />
          </div>
          {/* user 帳號名 */}
          <span className="forum-username">Eddie</span>
        </Modal.Title>
        <div className="forum-pop-threedot">
          <ForumThreeDot />
        </div>
      </Modal.Header>
      <Modal.Body>
        <h2>滑雪遇到⼤腳印</h2>
        <p className="forum-kind-color">
          滑雪經驗<span>10⽉04⽇ 10:08</span>
        </p>
        <span className="forum-p">
          雪人（英語：Yeti/Meti/Abominable Snowman；藏文：གཡའ་དྲེད་，威利：g.ya'
          dred；尼泊爾語：यति；學名:Dinanthropoides
          nivalis），一種傳說在珠穆朗瑪峰活動的動物，雪人是一種介於人與猿之間的神秘動物，至今尚未有確切的雪人標本提供研究。1889年一位英國陸軍中校LA·沃德爾在錫金東北部發現雪人足跡，並寫成專書出版。1925年希臘攝影家托姆巴基在尼泊爾的塞姆冰河上目睹雪人，這是最早的西方人目擊事件，而雪人一詞開始使用。1951年11月英國珠穆朗瑪峰登山隊隊員艾瑞克·西普頓（Eric
          Shipton）在高里三喀山脈拍下第一張雪人清晰的腳印的照片，這是雪地上留下來的腳印，長有45公分，寬32公分，有五根指頭，三小兩大，腳後跟平坦，拇指很大向外張開，1986年3月，英國人安索尼在喜馬拉雅山的雪地遇見雪人，身高約180公分，全身長著黑毛。安索尼用相機拍攝下來。1960年韓德卿將一塊雪人頭皮帶回英國，經鑑定所謂的雪人頭皮是用羚羊皮偽造的，但也有專家認為只是類似羚羊皮的結構，仍有猿的成份。但義大利著名登山家萊因霍爾德·梅斯納在2000年宣稱雪人只是棕熊的誤傳。2013年，英國牛津大學人類遺傳學專家布賴恩·賽克斯教授聲稱，DNA樣本檢測顯示，這種神秘生物可能是北極熊和棕熊雜交出的一個亞種[2]。
          根據當地村民傳說，雪人有自己的語言，分肉食性和素食性，肉食性的有襲擊人類及食用人類或人類屍體的傳說，而且不論公母皆可能會對人類性侵犯。被認為是人類和猿人之間失去的連結。
        </span>
        <div className="forum-img">
          {/* 只能上傳jpg、png */}
          <img src={`${IMAGE_FORUM_URL}/post.jpg`} alt="snowman-defult" />
        </div>
        <hr />
        {/* 點讚愛心+留言數 */}
        <ForumHeartCommit />
        <span className="heart-count">
          <BsHeartFill />
        </span>
        <ForumCommit />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
export default ForumModal;
