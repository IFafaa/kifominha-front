interface FormDataObject {
  [key: string]: string | Blob | Record<string, any>;
}

export class FormDataHelper {
  static objectToFormData(
    obj: FormDataObject,
    formData: FormData = new FormData(),
    parentKey = ''
  ) {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const value = obj[key];
        const formKey = parentKey ? `${parentKey}[${key}]` : key;

        if (typeof value === 'object' && !(value instanceof Blob)) {
          this.objectToFormData(value, formData, formKey);
        } else {
          formData.append(formKey, value);
        }
      }
    }

    return formData;
  }
}
