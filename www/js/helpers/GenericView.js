class GenericView {

    constructor(views, page) {

        this.views = views;
        this.page = page;

        this.fields = this._getViewDefinition(this.page);


    }

    _getViewDefinition(pageName) {

        let page = views.find(view => view.name === pageName);

        if (!page) {
            return null;
        }

        let fields = page.fields.map(field => {

            let model = models.find(model => model.table === field.model);
            let fieldDefinition = model.fields.find(f => f.name === field.field);
            return fieldDefinition;

        });

        return fields;

    }

    _getViewSource() {

        let definition = this.fields.map(field => {

            switch (field.type) {
                case 'TEXT':
                    return `<div class="form-group">
                                <label for="${field.name}">${field.title}</label>
                                <input type="text" class="form-control" id="${field.name}" v-model="model.${field.name}">
                            </div>`;

                default:
                    break;
            }


        });

        return definition.join('');

    }

}