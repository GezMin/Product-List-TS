interface Product {
    id: string
    name: string
}

type Department = { [key: string]: Product[] }

const meat: Product[] = [
    { id: '1', name: 'Beef' },
    { id: '2', name: 'Chicken' },
    { id: '3', name: 'Pork' },
    { id: '4', name: 'Turkey' },
    { id: '5', name: 'Lamb' },
]

const vegetable: Product[] = [
    { id: '6', name: 'Broccoli' },
    { id: '7', name: 'Cabbage' },
    { id: '8', name: 'Carrot' },
    { id: '9', name: 'Potato' },
    { id: '10', name: 'Cucumber' },
]

const dairy: Product[] = [
    { id: '11', name: 'Milk' },
    { id: '12', name: 'Cheese' },
    { id: '13', name: 'Yogurt' },
    { id: '14', name: 'Butter' },
    { id: '15', name: 'Cream' },
]

const bakery: Product[] = [
    { id: '16', name: 'Bread' },
    { id: '17', name: 'Croissant' },
    { id: '18', name: 'Cake' },
    { id: '19', name: 'Cookies' },
    { id: '20', name: 'Muffins' },
]

const canned: Product[] = [
    { id: '21', name: 'Tomato Sauce' },
    { id: '22', name: 'Canned Beans' },
    { id: '23', name: 'Canned Tuna' },
    { id: '24', name: 'Canned Corn' },
    { id: '25', name: 'Canned Fruit' },
]

const departments: Department = {
    meat,
    vegetable,
    dairy,
    bakery,
    canned,
}

export default departments
