import React, { useEffect } from "react";
import { forumList } from "./moduleList";

function ForumEdit({ editContent, setEditContent }) {
  function handleChange(e) {
    let name = e.target.name;
    let newValue = e.target.value;
    setEditContent((cur) => {
      return { ...cur, [name]: newValue };
    });
  }
  return (
    <>
      {/* 選類別 */}
      <div className="d-flex justify-content-around">
        <div>
          <input
            type="radio"
            name="category"
            value="1"
            checked={editContent.category == 1}
            onChange={handleChange}
          />
          <label>{forumList[1]}</label>
        </div>
        <div>
          <input
            type="radio"
            name="category"
            value="2"
            checked={editContent.category == 2}
            onChange={handleChange}
          />
          <label>{forumList[2]}</label>
        </div>
        <div>
          <input
            type="radio"
            name="category"
            value="3"
            checked={editContent.category == 3}
            onChange={handleChange}
          />
          <label>{forumList[3]}</label>
        </div>
      </div>

      <div className="forum-edit container">
        <input
          type="text"
          name="subject"
          value={editContent.subject}
          placeholder="標題"
          required
          onChange={handleChange}
        />

        <textarea
          className="textarea"
          name="content"
          placeholder="內容"
          value={editContent.content}
          required
          onChange={handleChange}
        ></textarea>
      </div>
    </>
  );
}

export default ForumEdit;
