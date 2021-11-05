import { Button } from "react-bootstrap";

function PageButton() {
  return (
    <>
      <div className="page_button ">
        <Button>{`<`}</Button>
        <Button>{`1`}</Button>
        {/* <Button>{`2`}</Button> */}
        <Button>{`>`}</Button>
      </div>
    </>
  );
}
export default PageButton;
