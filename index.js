/*

// Задание 1
// Представьте, что у вас есть класс для управления библиотекой. В этом классе будет приватное свойство для хранения списка книг, а также методы для добавления книги, удаления книги и получения информации о наличии книги.
// Класс должен содержать приватное свойство #books, которое инициализируется пустым массивом и представляет собой список книг в библиотеке.
// Реализуйте геттер allBooks, который возвращает текущий список книг.
// Реализуйте метод addBook(title), который позволяет добавлять книгу в список. Если книга с таким названием уже существует в списке, выбросьте ошибку с соответствующим сообщением.
// Реализуйте метод removeBook(title), который позволит удалять книгу из списка по названию. Если книги с таким названием нет в списке, выбросьте ошибку с соответствующим сообщением.
// Реализуйте метод hasBook(title), который будет проверять наличие книги в библиотеке и возвращать true или false в зависимости от того, есть ли такая книга в списке или нет.
// Реализуйте конструктор, который принимает начальный список книг (массив) в качестве аргумента. Убедитесь, что предоставленный массив не содержит дубликатов; в противном случае выбрасывайте ошибку.

// class Book {
//   #_titles = [];
//   constructor(title) {
//     const choice = this.#_titles.find((titleBook) => titleBook === title);

//     if (choice) {
//       throw new Error("Book has already been added with title", title);
//     }

//     this.title = title;
//     this.#_titles.push(title);
//     console.log(this.title, this.#_titles, choice);
//   }
// }

// const book1 = new Book("1");
// const book2 = new Book("1");
// console.log(JSON.stringify(book1) === JSON.stringify(book2));

class Library {
  #books = [];

  constructor(books) {
    const choice = new Set(books).size === books.length;

    if (!choice) {
      throw new Error("Books must be unique");
    }

    this.#books = books;
  }

  get allBooks() {
    return this.#books;
  }

  addBook(title) {
    const choice = this.#books.find((titleLib) => titleLib === title);

    if (choice) {
      throw new Error("Book already exists");
    }

    this.#books.push(title);
  }

  removeBook(title) {
    const choice = this.#books.find((titleLib) => titleLib === title);

    if (!choice) {
      throw new Error("Book has not yet");
    }

    this.#books = this.#books.filter((titleLib) => titleLib !== title);
  }

  hasBook(title) {
    return this.#books.find((titleLib) => titleLib === title)
      ? `has ${title}`
      : `has not ${title}`;
  }
}

const lib1 = new Library(["foo", "bar", "baz"]);
console.log(lib1.hasBook("foos"));
console.log(lib1.hasBook("foo"));
console.log(lib1.allBooks);

lib1.removeBook("foo");
console.log(lib1.allBooks);

lib1.addBook("foo");
console.log(lib1.allBooks);

const lib2 = new Library(["foo", "bar", "baz", "foo"]);

*/

// Задание 2
// Вы разрабатываете систему отзывов для вашего веб-сайта. Пользователи могут оставлять отзывы, но чтобы исключить слишком короткие или слишком длинные сообщения, вы решаете установить некоторые ограничения.
// Создайте HTML-структуру с текстовым полем для ввода отзыва, кнопкой для отправки и контейнером, где будут отображаться отзывы.
// Напишите функцию, которая будет добавлять отзыв в контейнер с отзывами. Однако если длина введенного отзыва менее 50 или более 500 символов, функция должна генерировать исключение.

// При добавлении отзыва, он должен отображаться на странице под предыдущими отзывами, а не заменять их.

// Вы можете использовать этот массив initialData для начальной загрузки данных при запуске вашего приложения.

const initialData = [
  {
    product: "Apple iPhone 13",
    reviews: [
      {
        id: "1",
        text: "Отличный телефон! Батарея держится долго.",
      },
      {
        id: "2",
        text: "Камера супер, фото выглядят просто потрясающе.",
      },
    ],
  },
  {
    product: "Samsung Galaxy Z Fold 3",
    reviews: [
      {
        id: "3",
        text: "Интересный дизайн, но дорогой.",
      },
    ],
  },
  {
    product: "Sony PlayStation 5",
    reviews: [
      {
        id: "4",
        text: "Люблю играть на PS5, графика на высоте.",
      },
    ],
  },
];

const products = document.querySelector(".products");
const productTemplate = document.getElementById("template-product").content;

const createProduct = (
  product = {
    product: "product",
    reviews: [{ id: "0", text: "text" }],
  }
) => {
  let productEl = productTemplate.cloneNode(true);

  let titleEl = productEl.querySelector(".title");
  titleEl.innerHTML = product.product;

  let inpEl = productEl.querySelector(".inp");
  let btnEl = productEl.querySelector(".btn");

  let revEl = productEl.querySelector(".reviews");
  product.reviews.forEach((review) => {
    let li = document.createElement("li");
    li.classList.add("review");
    li.classList.add(`review${review.id}`);
    li.innerHTML = review.text;

    revEl.appendChild(li);
  });
  let warnEl = productEl.querySelector(".warning");

  btnEl.addEventListener("click", (e) => {
    if (inpEl.value.length > 500 || inpEl.value.length < 50) {
      warnEl.innerHTML = `${inpEl.value} - must be 50 <= value <= 500`;
      throw new Error(warnEl.innerHTML);
    }

    let liEl = document.createElement("li");
    liEl.classList.add("li");
    liEl.innerHTML = inpEl.value;
    revEl.appendChild(liEl);
    warnEl.innerHTML = "ok!";

    setTimeout(() => (warnEl.innerHTML = ""), 1000);
  });

  products.appendChild(productEl);
};

initialData.forEach((product) => createProduct(product));
