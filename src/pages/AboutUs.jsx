import { Accordion } from '../cmps/Accordion.jsx'

const faqs = [
    {
        title: 'Where are your branches?',
        content: <p>We have branches in Tel Aviv, Hadera and Bat Yam.</p>
    },
    {
        title: 'Do you ship toys?',
        content: <p>Yes! We ship all over the country, delivery takes 3-5 business days.</p>
    },
    {
        title: 'Can I return a toy?',
        content: <p>Sure - you can return any toy within 14 days, as long as it is in its original box.</p>
    },
    {
        title: 'Do you have gift wrapping?',
        content: <p>Every toy can be gift wrapped for free, just ask at the counter.</p>
    },
]

export function AboutUs() {
    return (
        <section className="about-us">
            <h2>About Us</h2>
            <p>Mister Toy is a family owned toy shop. We have been bringing smiles to kids (and grown ups) for years, with toys for every age - from babies to puzzle masters.</p>

            <h3>FAQ</h3>
            <Accordion items={faqs} />
        </section>
    )
}
