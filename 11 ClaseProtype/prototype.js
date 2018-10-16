function Person (name, lastName, gender) {
  this.name = name;
  this.lastName = lastName;
  this.gender = gender;
}

// como ejecutar la funcion
Person ("Andrea", "Cordoba", "F"); //return undefined

// usar  el operador new
var me = new Person ("Andrea", "Cordoba", "F"); //retorna el objeto

// metodos
Person.prototype.introduce = function(){
  console.log( `Hi I'm ${this.name}` )
}

// como ejecutar un metodo
me.introduce();

//herencia

function Developer(name, lastName, gender, yearsOfExperience) {
  Person.call( this, name, lastName, gender );
  this.yearsOfExperience = yearsOfExperience;
}

//como ejecutar
me2 = new Developer( "Andres", "Ruiz", "M", 2); //pero no hereda os metodos

//heredar metodos tambien llamado delegar
Developer.prototype = Object.create(Person.prototype); // si el prototype se hace despues de crear el objeto este objeto no lo tendrá

//usarlo 
meD = new Developer( "Ana", "Lozada", "F", 3);
meD.introduce();

Developer.prototype.introduceAboutJob = function () {
  console.log (`Hello I'm ${this.name} ${this.lastName} and I have ${this.yearsOfExperience} of experience`);
}

//como usarlo
meD1 = new Developer( "Chris", "Na", "M", 5);
meD1.introduce();
meD1.introduceAboutJob();

//clases

 //sugar sintax
class PersonWithClass {

  constructor( name, lastName, gender ) {
    this.name = name;
    this.lastName = lastName;
    this.gender = gender;
  }

  introduce() {
    console.log( `Hi I'm ${this.name}` )
  }
}

class DeveloperWithClass extends PersonWithClass {
  constructor ( name, lastName, gender, yearsOfExperience ) {
    super(name, lastName, gender);
    this.yearsOfExperience = yearsOfExperience;
  }
  introduceAboutJob() {
    console.log( `Hi I'm ${this.name} and have ${this.yearsOfExperience} years of experience` )
  }
}

meD = new DeveloperWithClass("Andre", "Cordoba", "F", 4);