import SimpleSchema from 'simpl-schema';

const StringSchema = new SimpleSchema({
    basicString: {
        type: String
    },
    limitedString: {
        type: String,
        allowedValues: ['pro', 'con']
    },
    regExpString: {
        type: String,
        regEx: SimpleSchema.RegEx.Id
    },
    createdAt: {
        type: Date,
        autoValue: () => new Date()
    },
    title: {
        type: String,
        label: "Title",
        /* Can't use arrow function here, else the context won't be available */
        custom: function() {
          const text = this.value;

          if (text.length > 100) return { type: SimpleSchema.ErrorTypes.MAX_STRING, max: 100 };
          else if (text.length < 10) return SimpleSchema.ErrorTypes.MIN_STRING;
        }
    }
});

StringSchema.validate({
    basicString: "Test",
    limitedString: "pro",
    regExpString: "id"
}, {keys: ['basicString']});

const StringSchemaWithOptions = new SimpleSchema({
    basicString: {
        type: String
    },
    limitedString: {
        type: String,
        allowedValues: ['pro', 'con']
    },
    subschema: {
        type: StringSchema
    },
    userId: {
        type: String,
        regEx: SimpleSchema.RegEx.Id
    },
    createdAt: {
        type: Date,
        autoValue: () => new Date(),
    },
},
{
    clean: {
        filter: true,
        autoConvert: true,
        removeEmptyStrings: true,
        trimStrings: true,
        getAutoValues: true,
        removeNullsFromArrays: true,
    }
});

new SimpleSchema({
    shortBoolean: Boolean,
    shortString: String,
    shortNumber: Number,
    shortInteger: SimpleSchema.Integer,
    shortDate: Date,
    shortArray: Array,
    subSchema: StringSchemaWithOptions
});

SimpleSchema.extendOptions(['autoform']);
