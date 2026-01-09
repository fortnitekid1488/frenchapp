// Leçon 3 - Dossier 2 - Data
const lessonData = {
  meta: {
    title: "Dossier 2. Leçon 3",
    themes: ["La famille", "Les relations", "L'impératif", "L'imparfait", "Verbes du 2ème groupe"]
  },

  // ========================================
  // TEXTE (Зелёный раздел)
  // ========================================
  texte: {
    title: "Les vacances des Jean",
    content: [
      {
        fr: "Cet été, finalement, on est allés à Saint-Vivien. Juste nous six et maman. C'est papa qui a eu l'idée de nous mettre tous dans le train et de demander à papy Jean de venir nous chercher à la gare. Papa, qui n'avait pas beaucoup de vacances, devait venir pour la fin du séjour.",
        ru: "Этим летом мы наконец поехали в Сент-Вивьен. Только мы вшестером и мама. Это папа придумал посадить нас всех на поезд и попросить дедушку Жана встретить нас на вокзале. Папа, у которого было мало отпуска, должен был приехать к концу нашего пребывания."
      },
      {
        fr: "– Un mois de repos va te faire du bien, chérie. De vraies vacances de célibataire !",
        ru: "– Месяц отдыха пойдёт тебе на пользу, дорогая. Настоящие каникулы холостячки!"
      },
      {
        fr: "– Avec mes parents et six enfants, si nuisez maman.",
        ru: "– С моими родителями и шестью детьми, если мешаете, мама."
      },
      {
        fr: "– C'est vrai, chérie, a dit papa avec un petit rire. Mais pense à tous les plaisirs simples et bucoliques qui t'attendent : la joyeuse petite bande qui saute du lit le matin...",
        ru: "– Это правда, дорогая, – сказал папа с лёгким смешком. Но подумай обо всех простых и буколических удовольствиях, которые тебя ждут: весёлая маленькая банда, которая выпрыгивает из кровати утром..."
      },
      {
        fr: "– Et qu'il faut rattraper un à un pour qu'ils prennent leur douche.",
        ru: "– И которую нужно ловить по одному, чтобы они приняли душ."
      },
      {
        fr: "– Pour le déjeuner, quelques bons gros œufs à la coque venus tout droit de la ferme...",
        ru: "– На обед несколько хороших крупных яиц всмятку прямо с фермы..."
      },
      {
        fr: "– Trois douzaines, a précisé maman.",
        ru: "– Три дюжины, уточнила мама."
      },
      {
        fr: "En fait, maman déteste la campagne. Pas de chance pour elle : comme on est trop nombreux pour aller souvent à l'hôtel, papy Jean et mamie Jeannette ont acheté à Saint-Vivien une grande maison de famille où nous pouvons venir tous les huit pendant les vacances.",
        ru: "На самом деле мама ненавидит деревню. Ей не повезло: так как нас слишком много, чтобы часто ходить в отель, дедушка Жан и бабушка Жаннетт купили в Сент-Вивьене большой семейный дом, где мы все восемь можем приезжать на каникулы."
      },
      {
        fr: "– À propos, a renchéri Jean-A, qui va garder Dick pendant qu'on va être à Saint-Vivien ?",
        ru: "– Кстати, добавил Жан-А, кто будет присматривать за Диком, пока мы будем в Сент-Вивьене?"
      },
      {
        fr: "– Et mon cochon d'Inde ? s'est inquiété Jean-D. Et mes poissons rouges ? a ajouté Jean-E. Et ma tortue ? a demandé Jean-F.",
        ru: "– А моя морская свинка? – забеспокоился Жан-Д. – А мои золотые рыбки? – добавил Жан-Э. – А моя черепаха? – спросил Жан-Ф."
      }
    ],
    vocabulary: [
      { fr: "célibataire", ru: "холостой, незамужняя" },
      { fr: "bucolique", ru: "буколический, пасторальный" },
      { fr: "rattraper", ru: "догнать, поймать" },
      { fr: "la coque", ru: "скорлупа (œuf à la coque - яйцо всмятку)" },
      { fr: "la douzaine", ru: "дюжина" },
      { fr: "renchérir", ru: "добавить, подхватить" },
      { fr: "le cochon d'Inde", ru: "морская свинка" },
      { fr: "la tortue", ru: "черепаха" }
    ]
  },

  // ========================================
  // VOCABULAIRE THÉMATIQUE (Розовый раздел)
  // ========================================
  vocabulaire: {
    famille: [
      { fr: "parents (m, pl)", ru: "родители" },
      { fr: "une mère (maman)", ru: "мать (мама)" },
      { fr: "un père (papa)", ru: "отец (папа)" },
      { fr: "un frère aîné / cadet", ru: "старший / младший брат" },
      { fr: "une sœur aînée / cadette", ru: "старшая / младшая сестра" },
      { fr: "être enfant unique", ru: "быть единственным ребёнком в семье" },
      { fr: "une famille nombreuse", ru: "многодетная семья" },
      { fr: "grands-parents", ru: "бабушка и дедушка" },
      { fr: "une grand-mère (mamie)", ru: "бабушка" },
      { fr: "un grand-père (papy / papi)", ru: "дедушка" },
      { fr: "petits-enfants", ru: "внуки" },
      { fr: "un petit-fils", ru: "внук" },
      { fr: "une petite-fille", ru: "внучка" },
      { fr: "un oncle", ru: "дядя" },
      { fr: "une tante", ru: "тётя" },
      { fr: "un neveu", ru: "племянник" },
      { fr: "une nièce", ru: "племянница" },
      { fr: "beau-parents", ru: "приёмные родители; свёкор/тёща" },
      { fr: "un beau-père", ru: "отчим; свёкор; тесть" },
      { fr: "une belle-mère", ru: "мачеха; свекровь; тёща" },
      { fr: "un mari (époux)", ru: "муж (супруг)" },
      { fr: "une femme (épouse)", ru: "жена (супруга)" },
      { fr: "un compagnon, une compagne", ru: "гражданский муж, гражданская жена" },
      { fr: "un petit ami (copain)", ru: "молодой человек, парень" },
      { fr: "une petite amie (copine)", ru: "девушка" },
      { fr: "célibataire", ru: "холостой, не замужем" },
      { fr: "marié, -e", ru: "женатый, замужняя" },
      { fr: "divorcé, -e", ru: "разведённый, -ая" },
      { fr: "un veuf", ru: "вдовец" },
      { fr: "une veuve", ru: "вдова" }
    ],
    relations: [
      { fr: "se rencontrer (rencontre, f)", ru: "встретиться (встреча)" },
      { fr: "faire connaissance avec qn", ru: "познакомиться с кем-то" },
      { fr: "être amoureux (-se) de qn", ru: "быть влюблённым, -ой в кого-то" },
      { fr: "tomber amoureux (-se) de qn", ru: "влюбиться в кого-то" },
      { fr: "s'entendre", ru: "ладить между собой" },
      { fr: "sortir avec qn (ils sortent ensemble)", ru: "встречаться с кем-то (они встречаются)" },
      { fr: "vivre avec qn (en union libre)", ru: "жить с кем-то (в гражданском браке)" },
      { fr: "se marier (mariage, m)", ru: "пожениться (свадьба)" },
      { fr: "se marier avec qn", ru: "жениться на ком-то, выйти замуж" },
      { fr: "épouser qn", ru: "жениться на, выйти замуж за" },
      { fr: "divorcer avec qn (divorce, m)", ru: "развестись (развод)" },
      { fr: "se séparer", ru: "расстаться" },
      { fr: "rompre (rupture, f)", ru: "порвать (разрыв)" },
      { fr: "se réunir", ru: "собраться" },
      { fr: "être proche de qn (les proches)", ru: "быть близким с кем-то (близкие люди)" },
      { fr: "être amis (amitié, f)", ru: "быть друзьями (дружба)" },
      { fr: "passer du temps (beaucoup de temps) avec qn", ru: "проводить время (много времени) с кем-то" },
      { fr: "élever qn", ru: "растить, воспитывать" },
      { fr: "gâter qn", ru: "баловать" },
      { fr: "punir qn", ru: "наказывать" },
      { fr: "se disputer", ru: "ссориться, спорить" },
      { fr: "respecter qn (respect, m)", ru: "уважать (уважение)" },
      { fr: "partager qch avec qn", ru: "разделить, делиться" }
    ],
    expressions: [
      { fr: "garder qch/qn", ru: "хранить, охранять" },
      { fr: "garder la maison", ru: "охранять дом" },
      { fr: "garder le lit", ru: "соблюдать постельный режим" },
      { fr: "garder un secret", ru: "хранить секрет" },
      { fr: "garder le silence", ru: "молчать" },
      { fr: "garder un livre etc.", ru: "оставлять у себя, не возвращать книгу и т.п." },
      { fr: "garder les enfants", ru: "сидеть с детьми" },
      { fr: "garder le contact", ru: "оставаться на связи" },
      { fr: "garder un souvenir", ru: "хранить воспоминание" },
      { fr: "s'inquiéter de qch", ru: "беспокоиться за что-то" },
      { fr: "s'inquiéter pour qn", ru: "беспокоиться за кого-то" },
      { fr: "Ça m'inquiète.", ru: "Это меня беспокоит, тревожит." }
    ]
  },

  // ========================================
  // GRAMMAIRE (Синий раздел)
  // ========================================
  grammaire: {
    imperatif: {
      title: "L'impératif",
      rules: [
        "Образуется от форм настоящего времени 2 л. ед. ч., 1 л. мн. ч. и 2 л. мн. ч.",
        "Личные местоимения-подлежащие при этом опускаются.",
        "У глаголов 1 группы, а также у глаголов aller и ouvrir / offrir в форме 2 л. ед. ч. окончание -s опускается."
      ],
      examples: [
        { fr: "Tu fais → Fais !", ru: "Делай!" },
        { fr: "Vous ne faites pas → Ne faites pas !", ru: "Не делайте!" },
        { fr: "Nous faisons → Faisons !", ru: "Сделаем!" },
        { fr: "Tu parles → Parle !", ru: "Говори!" },
        { fr: "Tu vas → Va !", ru: "Иди!" },
        { fr: "Tu ouvres → Ouvre !", ru: "Открой!" }
      ],
      special: {
        avoir: ["Aie !", "Ayez !", "Ayons !"],
        être: ["Sois !", "Soyez !", "Soyons !"],
        savoir: ["Sache !", "Sachez !", "Sachons !"]
      },
      negative: [
        { fr: "Vous le regardez → Regardez-le !", ru: "Смотрите на это!" },
        { fr: "Vous le regardez → Ne le regardez pas !", ru: "Не смотрите на это!" },
        { fr: "Tu me parles → Parle-moi !", ru: "Поговори со мной!" },
        { fr: "Tu me parles → Ne me parle pas !", ru: "Не говори со мной!" }
      ]
    },
    imparfait: {
      title: "L'imparfait",
      rules: [
        "Образуется от формы 1 л. мн. ч. настоящего времени (формы nous).",
        "К основе этой формы добавляются окончания: -ais, -ais, -ait, -ions, -iez, -aient",
        "Исключение – глагол être: j'étais, tu étais, il/elle était, nous étions, vous étiez, ils/elles étaient"
      ],
      examples: [
        { fr: "marcher → nous marchons → je marchais", ru: "я ходил(а)" },
        { fr: "finir → nous finissons → je finissais", ru: "я заканчивал(а)" },
        { fr: "venir → nous venons → je venais", ru: "я приходил(а)" }
      ],
      usage: [
        "Описание природы, окружающей обстановки, людей",
        "Воспоминания из прошлого: ce, что было раньше (avant), в детстве (dans l'enfance), в молодости (dans la jeunesse), в то время (à l'époque)",
        "Описание привычных и повторяющихся действий: d'habitude, normalement, en général, chaque année, tous les jours"
      ],
      conjugation: {
        venir: {
          affirmative: ["je venais", "tu venais", "il/elle venait", "nous venions", "vous veniez", "ils/elles venaient"],
          negative: ["je ne venais pas", "tu ne venais pas", "il/elle ne venait pas", "nous ne venions pas", "vous ne veniez pas", "ils/elles ne venaient pas"]
        }
      }
    },
    verbes2groupe: {
      title: "Verbes du 2ème groupe",
      description: "Глаголы 2-й группы. Их особенность – суффикс -iss- в формах множественного числа.",
      verbs: [
        { fr: "agir", ru: "действовать" },
        { fr: "grandir", ru: "расти" },
        { fr: "obéir à qn", ru: "подчиняться, слушаться" },
        { fr: "punir", ru: "наказывать" },
        { fr: "maigrir", ru: "худеть" },
        { fr: "remplir", ru: "заполнять, наполнять" },
        { fr: "réfléchir", ru: "размышлять" },
        { fr: "finir", ru: "заканчивать" },
        { fr: "réussir", ru: "добиваться успеха, успешно что-то делать" },
        { fr: "vieillir", ru: "стареть" },
        { fr: "réunir", ru: "собрать, объединить" },
        { fr: "choisir", ru: "выбирать" }
      ],
      conjugation: {
        réunir: {
          present: ["je réunis", "tu réunis", "il/elle réunit", "nous réunissons", "vous réunissez", "ils/elles réunissent"],
          passeCompose: "j'ai réuni"
        }
      }
    },
    autresVerbes: {
      vivre: {
        present: ["je vis", "tu vis", "il/elle vit", "nous vivons", "vous vivez", "ils/elles vivent"],
        passeCompose: "j'ai vécu"
      },
      recevoir: {
        present: ["je reçois", "tu reçois", "il/elle reçoit", "nous recevons", "vous recevez", "ils/elles reçoivent"],
        passeCompose: "j'ai reçu",
        note: "réception, f – приём, получение"
      }
    }
  },

  // ========================================
  // EXERCICES - Переводы
  // ========================================
  exercises: {
    traduisez: [
      // Упражнение 10 - Traduisez
      { ru: "Он реагирует на это плохое настроение.", fr: "Il réagit à cette mauvaise humeur." },
      { ru: "Подумайте хорошо.", fr: "Réfléchissez bien." },
      { ru: "Дети растут очень быстро.", fr: "Les enfants grandissent très vite." },
      { ru: "Не наказывайте его!", fr: "Ne le punissez pas !" },
      { ru: "Он наполняет бокал.", fr: "Il remplit le verre." },
      { ru: "Мы собираемся раз в год.", fr: "Nous nous réunissons une fois par an." },
      { ru: "Моя бабушка и дедушка постарели.", fr: "Mes grands-parents ont vieilli." },
      { ru: "Дай дочке осуществить свой проект.", fr: "Laisse ta fille accomplir son projet." },
      { ru: "Директор собрал всех коллег.", fr: "Le directeur a réuni tous les collègues." },
      { ru: "Я надеюсь успешно сдать все экзамены.", fr: "J'espère réussir à tous les examens." },
      
      // Упражнение 14 - Traduisez
      { ru: "Он получил 200 евро за свою работу.", fr: "Il a reçu 200 euros pour son travail." },
      { ru: "Они счастливо прожили вместе 50 лет.", fr: "Ils ont vécu heureux ensemble pendant 50 ans." },
      { ru: "Она встречает своих гостей с большой радостью.", fr: "Elle reçoit ses invités avec une grande joie." },
      { ru: "Кто вас принял? Сам директор или руководитель проекта?", fr: "Qui vous a reçu ? Le directeur lui-même ou le responsable du projet ?" },
      { ru: "Эта группа очень популярна, музыканты получают по тысяче писем в день.", fr: "Ce groupe est très populaire, les musiciens reçoivent mille lettres par jour." },
      { ru: "Она живёт вместе с родителями в небольшой квартире, но в хорошем районе.", fr: "Elle vit avec ses parents dans un petit appartement, mais dans un bon quartier." }
    ],
    questions: [
      // Questions from Vocabulaire section
      "Avez-vous des frères ou des sœurs ? Ou êtes-vous enfant unique ?",
      "Aimez-vous regarder les albums photos ?",
      "Prenez-vous souvent votre famille en photo ?",
      "Montrez une photo de votre famille et présentez-la à vos amis.",
      "Êtes-vous proche de vos parents ? Passez-vous beaucoup de temps ensemble ? Qu'est-ce que vous aimez faire ensemble ?",
      "Quel âge ont vos grands-parents ? Vivez-vous ensemble avec vos grands-parents ? Sont-ils à la retraite ou travaillent-ils toujours ?",
      "Vivez-vous avec vos parents ? Avez-vous des tantes, oncles, cousins, cousines, beaux-parents ?",
      "Est-ce que toute votre famille se réunit souvent ?",
      "Avez-vous des traditions familiales ?",
      "Est-il important de vivre ensemble avant de se marier ?",
      "Voudriez-vous avoir une grande famille ? Beaucoup d'enfants ?"
    ]
  }
};

// Export for use in the app
if (typeof module !== 'undefined' && module.exports) {
  module.exports = lessonData;
}
