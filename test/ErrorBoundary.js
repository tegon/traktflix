import { mount } from '../test-helpers/EnzymeHelper';
import sinon from 'sinon';
import React from 'react';
import ErrorBoundary from '../src/class/ErrorBoundary';

class Test extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div>Test</div>;
  }
}

describe(`ErrorBoundary`, () => {
  it(`children appear correctly when no error is thrown`, () => {
    const component = mount(
      <ErrorBoundary>
        <Test/>
      </ErrorBoundary>
    );
    expect(component.find(`div`).text()).to.equal(`Test`);
    component.unmount();
  });

  it(`children are replaced with error message when error is thrown`, () => {
    sinon.stub(ErrorBoundary.prototype, `componentDidCatch`);
    const component = mount(
      <ErrorBoundary>
        <Test/>
      </ErrorBoundary>
    );
    const error = new Error(`Test`);
    component.find(Test).simulateError(error);
    component.setState({hasError: true});
    expect(ErrorBoundary.prototype.componentDidCatch.callCount).to.equal(1);
    expect(component.find(`h1`).text()).to.equal(`Something went wrong.`);
    component.unmount();
    ErrorBoundary.prototype.componentDidCatch.restore();
  });
});