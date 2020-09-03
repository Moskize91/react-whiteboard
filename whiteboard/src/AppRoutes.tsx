import  * as React from "react";
import {BrowserRouter} from "react-router-dom";
import {Route, Switch} from "react-router";
import {message} from "antd";
import WhiteboardCreatorPage from "./WhiteboardCreatorPage";
import IndexPage from "./IndexPage";
import WhiteboardPage from "./WhiteboardPage";
import ReplayPage from "./ReplayPage";
import JoinPage from "./JoinPage";
import AddNamePage from "./AddNamePage";
export class AppRoutes extends React.Component<{}, {}> {

    public constructor(props: {}) {
        super(props);
    }

    public componentDidCatch(error: any, inf: any): void {
        message.error(`网页加载发生错误：${error}`);
    }
    public render(): React.ReactNode {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/replay/:uuid/:userId/" component={ReplayPage}/>
                    <Route path="/whiteboard/:uuid/:userId/" component={WhiteboardPage}/>
                    <Route path="/whiteboard/:uuid?/" component={WhiteboardCreatorPage}/>
                    <Route path="/join/" component={JoinPage}/>
                    <Route path="/name/:uuid?/" component={AddNamePage}/>
                    <Route path="/" component={IndexPage}/>
                </Switch>
            </BrowserRouter>
      );
    }
}