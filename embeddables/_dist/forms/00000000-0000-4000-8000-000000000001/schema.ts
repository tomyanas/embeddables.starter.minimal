const schema = {
  "fields": [
    {
      "display_text": "Name",
      "field_type": "user_input",
      "key": "name",
      "label": "Name",
      "validations": {
        "required": true
      },
      "value_type": "text"
    },
    {
      "display_text": "Email",
      "field_type": "user_input",
      "key": "email",
      "label": "Email",
      "validations": {
        "required": true
      },
      "value_type": "email"
    },
    {
      "display_text": "Birth date",
      "field_type": "user_input",
      "key": "birth_date",
      "label": "Birth date",
      "validations": {
        "required": false
      },
      "value_type": "text"
    }
  ],
  "id": "00000000-0000-4000-8000-000000000001",
  "name": "Contact"
} as const;

export { schema };
export default schema;
