import React from "react";

function ForumEdit() {
  return (
    <>
      <form>
        <div className="forum-edit container">
          <input
            type="text"
            name="addPost" // 給Formdata使用
            value=""
            placeholder="標題"
            required
          />

          <textarea className="textarea" placeholder="內容"></textarea>
        </div>
      </form>
    </>
  );
}

export default ForumEdit;
