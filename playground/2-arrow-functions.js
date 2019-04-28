const birthday = {
  name: 'Birthday Party',
  guestList: ['Andre', 'Jen', 'Mike'],
  printGuestList() {

    console.log(`Guest list for ${this.name}`);

    this.guestList.forEach((guest) => {
      console.log(`${guest} is attending ${this.name}`);
    });
  },
};

birthday.printGuestList();
