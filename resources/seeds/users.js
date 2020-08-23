exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('user')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('user').insert([
        { id: 1, forename: 'Joe', surname: 'Bloggs' },
        { id: 2, forename: 'Sam', surname: 'Smith' },
        { id: 3, forename: 'John', surname: 'Lennon' },
        { id: 4, forename: 'Teegan', surname: 'Foster' },
        { id: 5, forename: 'Morgan', surname: 'Logan' },
        { id: 6, forename: 'Alara', surname: 'Williamson' },
        { id: 7, forename: 'Jibril', surname: 'Mac' },
        { id: 8, forename: 'Conan', surname: 'Blair' },
        { id: 9, forename: 'Boris', surname: 'Johnson' },
        { id: 10, forename: 'David', surname: 'Cameron' },
        { id: 11, forename: 'Jon-Paul', surname: 'Krause' },
        { id: 12, forename: 'Manon', surname: 'Conrad' },
        { id: 13, forename: 'Roy', surname: 'Cowan' },
        { id: 14, forename: 'Megan', surname: 'Fox' },
        { id: 15, forename: 'Brad', surname: 'Pitt' },
        { id: 16, forename: 'Paul', surname: 'Rudd' },
        { id: 17, forename: 'Ryan', surname: 'Reynolds' },
        { id: 18, forename: 'Nick', surname: 'Frost' },
        { id: 19, forename: 'Tarun', surname: 'Hirst' },
        { id: 20, forename: 'Jorden', surname: 'Boyle' },
        { id: 21, forename: 'James', surname: 'Bond' },
        { id: 22, forename: 'Sherlock', surname: 'Holmes' },
        { id: 23, forename: 'Sweeney', surname: 'Todd' },
        { id: 24, forename: 'Harry', surname: 'Potter' },
        { id: 25, forename: 'Frodo', surname: 'Baggins' },
        { id: 26, forename: 'Valentino', surname: 'Barnard' },
        { id: 27, forename: 'Ariana', surname: 'Massey' },
        { id: 28, forename: 'Ptolemy', surname: 'Stone' },
        { id: 29, forename: 'Kellan', surname: 'Bright' },
        { id: 30, forename: 'Mariah', surname: 'Coles' },
      ])
    })
}
