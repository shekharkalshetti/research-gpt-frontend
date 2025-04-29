import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, ExternalLink } from "lucide-react"
import Link from "next/link"

// This would normally come from a database or API
const getPaperData = (id: string) => {
  const papers = {
    "attention-is-all-you-need-1": {
      title: "Attention is all you need",
      authors:
        "Ashish Vaswani, Noam Shazeer, Niki Parmar, Jakob Uszkoreit, Llion Jones, Aidan N. Gomez, Łukasz Kaiser, Illia Polosukhin",
      year: 2017,
      journal: "Advances in Neural Information Processing Systems",
      link: "https://proceedings.neurips.cc/paper/7181-attention-is-all",
      citedBy: 119097,
      sections: {
        summary:
          "This groundbreaking paper introduces the Transformer, a novel neural network architecture based entirely on attention mechanisms, dispensing with recurrence and convolutions entirely. The Transformer model achieves state-of-the-art results on machine translation tasks while being more parallelizable and requiring significantly less time to train than recurrent or convolutional models.",

        keyFindings: [
          "Self-attention mechanisms can replace recurrent networks for sequence modeling",
          "The Transformer architecture achieves superior translation quality with significantly less computation",
          "Multi-head attention allows the model to jointly attend to information from different representation subspaces",
          "Position encodings enable the model to utilize sequence order without recurrence",
          "The architecture scales effectively to larger models and datasets",
        ],

        objectives:
          "The paper aims to address limitations in sequence transduction models based on complex recurrent or convolutional neural networks, which are inherently sequential and difficult to parallelize. The authors propose a new simple network architecture based solely on attention mechanisms to allow for significantly more parallelization and achieve new state-of-the-art results in translation quality.",

        methods:
          "The Transformer architecture relies entirely on attention mechanisms to draw global dependencies between input and output. It uses stacked self-attention and point-wise, fully connected layers for both the encoder and decoder. The model employs multi-head attention, which allows it to jointly attend to information from different representation subspaces at different positions. Position information is incorporated through sinusoidal position encodings. The authors trained the model on the WMT 2014 English-German and English-French translation tasks.",

        results:
          "The Transformer model achieves 28.4 BLEU on the WMT 2014 English-to-German translation task, improving over the existing best results by over 2 BLEU. On the WMT 2014 English-to-French translation task, the model establishes a new single-model state-of-the-art BLEU score of 41.8. The model shows superior quality while being more parallelizable and requiring significantly less time to train. The authors also demonstrate that the Transformer generalizes well to other tasks by applying it successfully to English constituency parsing.",
      },
    },
    "attention-is-all-you-need-2": {
      title: "Attention is all you need",
      authors:
        "Ashish Vaswani, Noam Shazeer, Niki Parmar, Jakob Uszkoreit, Llion Jones, Aidan N. Gomez, Łukasz Kaiser, Illia Polosukhin",
      year: 2017,
      journal: "NIPS",
      link: "http://www.aiotlab.org/teaching/intro2ai/slides/10_attention_n_bert.pdf",
      citedBy: 2326,
      sections: {
        summary:
          "This paper introduces the Transformer, a novel architecture for sequence transduction that relies entirely on self-attention mechanisms without using recurrence or convolution. The model achieves new state-of-the-art results on machine translation tasks while being more parallelizable and requiring significantly less training time than previous approaches.",

        keyFindings: [
          "Self-attention can replace recurrent networks for sequence modeling tasks",
          "The Transformer architecture is highly parallelizable, reducing training time",
          "Multi-head attention allows the model to focus on different parts of the sequence simultaneously",
          "Position encodings provide sequence order information without recurrence",
          "The model scales effectively with more parameters and training data",
        ],

        objectives:
          "The paper aims to create a sequence transduction model that can learn long-range dependencies more efficiently than recurrent or convolutional neural networks, while being more parallelizable to reduce training time on modern hardware.",

        methods:
          "The Transformer uses stacked self-attention and point-wise, fully connected layers for both encoder and decoder. It employs multi-head attention to allow the model to jointly attend to information from different representation subspaces. Position information is incorporated through sinusoidal position encodings. The model was trained on the WMT 2014 English-German and English-French translation datasets.",

        results:
          "The Transformer achieves state-of-the-art BLEU scores on translation tasks while requiring significantly less computation to train. On the WMT 2014 English-to-German translation task, it achieves 28.4 BLEU, improving over the existing best results. On the WMT 2014 English-to-French translation task, it achieves a BLEU score of 41.8. The model demonstrates superior quality while being more parallelizable and requiring significantly less time to train.",
      },
    },
    "bert-pre-training": {
      title: "BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding",
      authors: "Jacob Devlin, Ming-Wei Chang, Kenton Lee, Kristina Toutanova",
      year: 2018,
      journal: "arXiv preprint",
      link: "https://arxiv.org/abs/1810.04805",
      citedBy: 67254,
      sections: {
        summary:
          "This paper introduces BERT (Bidirectional Encoder Representations from Transformers), a new language representation model that is designed to pre-train deep bidirectional representations from unlabeled text. BERT is pre-trained on a large corpus of text and can be fine-tuned with just one additional output layer to create state-of-the-art models for a wide range of NLP tasks without substantial task-specific architecture modifications.",

        keyFindings: [
          "Bidirectional pre-training is crucial for language representation",
          "BERT achieves state-of-the-art results on 11 NLP tasks",
          "The pre-trained model reduces the need for task-specific architectures",
          "BERT effectively captures contextual word representations",
          "The model scales well with more parameters and pre-training data",
        ],

        objectives:
          "The paper aims to develop a pre-trained language representation model that can be fine-tuned for various NLP tasks without requiring task-specific architectures. The authors seek to address limitations in previous language models that were either unidirectional or shallowly bidirectional.",

        methods:
          "BERT is based on the Transformer architecture and is pre-trained using two unsupervised tasks: Masked Language Modeling (MLM) and Next Sentence Prediction (NSP). In MLM, 15% of input tokens are masked, and the model must predict these masked tokens. In NSP, the model must predict whether two sentences appear consecutively in the original text. BERT is pre-trained on the BooksCorpus and English Wikipedia, totaling 3.3 billion words. The authors present two model sizes: BERT-Base (12 layers, 768 hidden units, 12 attention heads) and BERT-Large (24 layers, 1024 hidden units, 16 attention heads).",

        results:
          "BERT establishes new state-of-the-art results on eleven NLP tasks, including pushing the GLUE benchmark to 80.5% (7.7% absolute improvement), MultiNLI accuracy to 86.7% (4.6% absolute improvement), and SQuAD v1.1 question answering to 93.2 F1 score (1.5 absolute improvement). The paper demonstrates that a pre-trained language model with bidirectional training can be fine-tuned to excel at a wide range of NLP tasks without substantial task-specific architecture modifications.",
      },
    },
    "transformer-xl": {
      title: "Transformer-XL: Attentive Language Models Beyond a Fixed-Length Context",
      authors: "Zihang Dai, Zhilin Yang, Yiming Yang, Jaime Carbonell, Quoc V. Le, Ruslan Salakhutdinov",
      year: 2019,
      journal: "arXiv preprint",
      link: "https://arxiv.org/abs/1901.02860",
      citedBy: 2845,
      sections: {
        summary:
          "This paper introduces Transformer-XL (extra long), a novel architecture that enables learning dependencies beyond a fixed-length context without disrupting temporal coherence. It addresses the context fragmentation problem in vanilla Transformers by introducing a segment-level recurrence mechanism and a novel positional encoding scheme. Transformer-XL learns dependency that is 80% longer than RNNs and 450% longer than vanilla Transformers, achieving state-of-the-art results on both word-level and character-level language modeling tasks.",

        keyFindings: [
          "Segment-level recurrence mechanism enables learning longer-term dependencies",
          "Relative positional encoding scheme resolves context fragmentation",
          "Transformer-XL learns dependencies that are 80% longer than RNNs and 450% longer than vanilla Transformers",
          "The model achieves state-of-the-art results on both word-level and character-level language modeling",
          "Evaluation shows up to 1800+ times speedup during evaluation compared to vanilla Transformers",
        ],

        objectives:
          "The paper aims to address the limitation of fixed-length contexts in standard Transformers, which causes context fragmentation and inability to capture longer-term dependencies. The authors seek to develop a model that can learn dependencies beyond a fixed-length without disrupting temporal coherence.",

        methods:
          "Transformer-XL introduces two key techniques: a segment-level recurrence mechanism and a novel relative positional encoding scheme. The recurrence mechanism caches the hidden states from previous segments and reuses them as extended context when processing the current segment. The relative positional encoding scheme enables the model to keep track of positional information across segments. The authors evaluate Transformer-XL on word-level language modeling tasks (enwiki8, text8, WikiText-103, One Billion Word) and character-level language modeling tasks (enwiki8, text8).",

        results:
          "Transformer-XL achieves state-of-the-art results on five language modeling benchmarks. On WikiText-103, it reduces perplexity from 20.5 to 18.3, while on enwiki8, it reduces bits-per-character from 1.06 to 0.99. The model demonstrates the ability to capture longer-term dependencies, with an effective context length that is 80% longer than RNNs and 450% longer than vanilla Transformers. During evaluation, Transformer-XL shows up to 1800+ times speedup compared to vanilla Transformers when using the same amount of context.",
      },
    },
    reformer: {
      title: "Reformer: The Efficient Transformer",
      authors: "Nikita Kitaev, Łukasz Kaiser, Anselm Levskaya",
      year: 2020,
      journal: "arXiv preprint",
      link: "https://arxiv.org/abs/2001.04451",
      citedBy: 1523,
      sections: {
        summary:
          "This paper introduces the Reformer, an efficient variant of the Transformer model designed to handle very long sequences. The Reformer uses locality-sensitive hashing (LSH) to reduce the complexity of attention computation from O(L²) to O(L log L), where L is the sequence length. It also uses reversible residual layers to reduce memory requirements. These innovations allow the Reformer to process much longer sequences than standard Transformers while using substantially less memory.",

        keyFindings: [
          "LSH attention reduces computational complexity from O(L²) to O(L log L)",
          "Reversible residual layers reduce memory requirements during training",
          "Chunked feed-forward layers further reduce memory usage",
          "Reformer can handle sequences of length 64,000 or more",
          "The model maintains performance comparable to Transformers while being much more memory-efficient",
        ],

        objectives:
          "The paper aims to address the computational and memory efficiency limitations of Transformer models when processing very long sequences. The authors seek to develop a more efficient architecture that can handle sequence lengths of tens of thousands while maintaining the performance benefits of the Transformer.",

        methods:
          "The Reformer introduces three main innovations: (1) LSH attention, which uses locality-sensitive hashing to group similar vectors together, reducing the need to compare every query with every key; (2) Reversible residual layers, inspired by RevNets, which allow each layer's activations to be reconstructed from the next layer's activations, eliminating the need to store activations for most layers; and (3) Chunked feed-forward layers, which process the feed-forward computations in chunks to reduce memory requirements. The authors evaluate the Reformer on language modeling tasks and image generation.",

        results:
          "The Reformer achieves comparable performance to the Transformer while being much more memory-efficient. It can process sequences of length 64,000 or more on a single GPU, whereas standard Transformers would require multiple GPUs for much shorter sequences. On the enwik8 language modeling benchmark, Reformer achieves 1.05 bits per byte, comparable to the state-of-the-art. The authors also demonstrate the model's ability to generate 24,000 × 24,000 pixel images, a task that would be infeasible with standard Transformers due to memory constraints.",
      },
    },
  }

  return papers[id as keyof typeof papers]
}

export default function PaperPage({ params }: { params: { id: string } }) {
  const paper = getPaperData(params.id)

  if (!paper) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-off-white">
        <div className="text-center">
          <h1 className="font-obviously font-medium text-2xl mb-4">Paper not found</h1>
          <Link href="/results">
            <Button variant="outline">Back to results</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen flex flex-col bg-off-white">
      <header className="border-b border-silver/30 py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Logo />

          <Link href={paper.link} target="_blank" rel="noopener noreferrer" className="hidden md:flex">
            <Button variant="outline" size="sm" className="gap-2 font-cabinet">
              <ExternalLink className="h-4 w-4" />
              View Original Source
            </Button>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 flex-1">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Link
              href="/results"
              className="inline-flex items-center text-light-graphite hover:text-deep-graphite transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              <span className="font-cabinet">Back to results</span>
            </Link>
          </div>

          <div className="mb-8">
            <h1 className="font-obviously font-medium text-3xl md:text-4xl mb-4">{paper.title}</h1>
            <p className="text-light-graphite text-lg mb-2">{paper.authors}</p>
            <p className="text-light-graphite">
              {paper.journal}, {paper.year} • {paper.citedBy.toLocaleString()} citations
            </p>

            <div className="mt-4 md:hidden">
              <Link href={paper.link} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="sm" className="gap-2 font-cabinet">
                  <ExternalLink className="h-4 w-4" />
                  View Original Source
                </Button>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-0 shadow-sm bg-white">
              <CardContent className="p-6">
                <h2 className="font-obviously font-medium text-xl mb-4">Summary</h2>
                <p className="font-cabinet text-deep-graphite/80 leading-relaxed">{paper.sections.summary}</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm bg-white">
              <CardContent className="p-6">
                <h2 className="font-obviously font-medium text-xl mb-4">Key Findings</h2>
                <ul className="font-cabinet text-deep-graphite/80 leading-relaxed space-y-2">
                  {paper.sections.keyFindings.map((finding, index) => (
                    <li key={index} className="flex">
                      <span className="mr-2">•</span>
                      <span>{finding}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm bg-white">
              <CardContent className="p-6">
                <h2 className="font-obviously font-medium text-xl mb-4">Objectives</h2>
                <p className="font-cabinet text-deep-graphite/80 leading-relaxed">{paper.sections.objectives}</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm bg-white">
              <CardContent className="p-6">
                <h2 className="font-obviously font-medium text-xl mb-4">Methods</h2>
                <p className="font-cabinet text-deep-graphite/80 leading-relaxed">{paper.sections.methods}</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm bg-white md:col-span-2">
              <CardContent className="p-6">
                <h2 className="font-obviously font-medium text-xl mb-4">Results</h2>
                <p className="font-cabinet text-deep-graphite/80 leading-relaxed">{paper.sections.results}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 -z-20">
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(#2D2D34 1px, transparent 1px)`,
            backgroundSize: "30px 30px",
          }}
        />
      </div>
    </main>
  )
}
