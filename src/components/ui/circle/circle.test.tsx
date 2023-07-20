import renderer from "react-test-renderer";
import { ElementStates } from "../../../types/element-states";

import { Circle } from "./circle";

describe("Тест компонента Circle", () => {
  it("Элемент без буквы", () => {
    const tree = renderer.create(<Circle letter="" />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("Элемент с буквой", () => {
    const tree = renderer.create(<Circle letter="tst" />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("Элемент с head", () => {
    const tree = renderer.create(<Circle head="1" />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("Circle c реакт-элементом в head", () => {
    const tree = renderer.create(<Circle head={<Circle />} />);

    expect(tree).toMatchSnapshot();
  });

  it("Элемент с tail", () => {
    const tree = renderer.create(<Circle tail="1" />);

    expect(tree).toMatchSnapshot();
  });

  it("Circle с реактом-элементом в tail", () => {
    const tree = renderer.create(<Circle tail={<Circle />} />);

    expect(tree).toMatchSnapshot();
  });

  it("Элемент с index", () => {
    const tree = renderer.create(<Circle index={0} />);

    expect(tree).toMatchSnapshot();
  });

  it("Элемент с пропом isSmall === true", () => {
    const tree = renderer.create(<Circle isSmall={true} />);

    expect(tree).toMatchSnapshot();
  });

  it("Элемент в состоянии Default", () => {
    const tree = renderer.create(<Circle state={ElementStates.Default} />);

    expect(tree).toMatchSnapshot();
  });

  it("Элемент в состоянии Changing", () => {
    const tree = renderer.create(<Circle state={ElementStates.Changing} />);

    expect(tree).toMatchSnapshot();
  });

  it("Элемент в состоянии Modified", () => {
    const tree = renderer.create(<Circle state={ElementStates.Modified} />);

    expect(tree).toMatchSnapshot();
  });
});
