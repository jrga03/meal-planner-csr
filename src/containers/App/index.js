import React, { Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import styled from "styled-components";

import NotFoundPage from "containers/NotFoundPage";
import Recipes from "containers/Recipes";
import Header from "containers/Header";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #eaeaea;
  height: 100vh;
`;

export const LoaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const ContentWrapper = styled.div`
  flex-grow: 1;
  width: 100%;
  height: calc(100% - 56px);
  padding-top: 56px;

  @media screen and (orientation: landscape) {
    height: calc(100% - 48px);
    padding-top: 48px;
  }

  @media screen and (min-width: 600px) {
    height: calc(100% - 64px);
    padding-top: 64px;
  }
`;

/**
 * App componnent
 */
function App() {
  return (
    <Container>
      <Header />
      <ContentWrapper>
        <Suspense
          fallback={
            <LoaderWrapper>
                Loading...
            </LoaderWrapper>
          }
        >
          <Switch>
            <Route exact path="/">
              <Redirect to="/recipes" />
            </Route>
            <Route exact path="/recipes" component={ Recipes } />
            <Route component={ NotFoundPage } />
          </Switch>
        </Suspense>
      </ContentWrapper>
    </Container>
  );
}

export default App;
