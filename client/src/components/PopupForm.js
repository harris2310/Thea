import React from 'react';
import { Form,
         Input,
         Label,
         FormGroup,
         CustomInput,
         Button } from 'reactstrap';


class PopupForm extends React.Component {
  render() {
    const { handleChange, imageSubmitted, formSubmitted } = this.props;
    return(
      <Form onSubmit={formSubmitted}>
        <FormGroup>
          <Label for="Message" sm={2} size="lg">Message</Label>
          <Input type="textarea"
                 name="message"
                 onChange={handleChange}
                 placeholder="Message" />
        </FormGroup>
        <FormGroup>
          <Label for="ImageUpload" sm={2} size="lg">UploadYourView</Label>
          <CustomInput type="file"
                       id="exampleCustomFileBrowser"
                       name="customFile"
                       onChange={imageSubmitted} />
        </FormGroup>
        <Button>Go!</Button>
      </Form>
    )
  }
}

export default PopupForm;