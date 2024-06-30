import { ConctactsRepository, Contact, ContactCreate } from "../interface/contacts.interface";
import { ConctactsRepositoryPrisma } from "../repositories/contacts.repository";
import { UserRepositoryPrisma } from "../repositories/user.repository";

class ContactUserCase {
    private contactRepository: ConctactsRepository;
    private userRepository: UserRepositoryPrisma;
    constructor() {
        this.contactRepository = new ConctactsRepositoryPrisma();
        this.userRepository = new UserRepositoryPrisma();
    }

    async create({email, name, phone, userEmail}: ContactCreate) {
        const user = await this.userRepository.findByEmail(userEmail);

        if (!user) {
            throw new Error('User not found');
        }

        const verifyIfExistsContacts = await this.contactRepository.findByEmailOrPhone(email, phone);

        if (verifyIfExistsContacts) {
            throw new Error("Contact already exists");
        }

        const contact = await this.contactRepository.create({
            email,
            name,
            phone,
            userId: user.id
        });

        return contact;
    }

    async listAllContacts(userEmail: string) {
        const user = await this.userRepository.findByEmail(userEmail);

        if (!user) {
            throw new Error('User not found');
        }

        const contacts = await this.contactRepository.findAllContacts(user.id);

        return contacts;

    }

    async updateContact({id, name, email, phone}: Contact) {
        const data = await this.contactRepository.updateContact({
            id,
            name,
            email,
            phone
        });

        return data;
    }

    async deleteContact(id: string) {
        const data = await this.contactRepository.deleteContact(id);

        return data;
    }

}

export { ContactUserCase };