var FakeDatabase = module.exports = {

    data: [],

    add: function(obj) {
        //adds item to end of array holding data
        FakeDatabase.data.push(obj);

        FakeDatabase.data = FakeDatabase.data.sort(function(a,b){
                if (a.age > b.age) {
                    return 1;
                } else if (a.age < b.age) {
                    return -1;
                } else {
                    if (a.name > b.name) {
                        return 1;
                    } else if (a.name < b.name) {
                        return -1
                    } else {
                        return 0;
                    } 
                }
        });
    },

    getAll: function() {
        //returns copy of array of all items in the database
        return FakeDatabase.data.slice();
    },

    remove: function(index) {
        //removes item located at index in array and returns it
        return FakeDatabase.data.splice(index,1);
    }
}