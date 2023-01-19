import { Card } from "react-bootstrap";
import "./PageNotFound.css";

//This component displays a page not found message if there's no such page
function PageNotFound(): JSX.Element {
    return (
        <div className="PageNotFound">
			<Card className="p-2">No page with this url. Please try again!</Card>
        </div>
    );
}

export default PageNotFound;
