---
title: Understanding Vue Directives
description: Directives are a huge part of Vue, so it is important that we understand them as developers. Not only are they an essential part of the Vue framework out of the box, but by understanding them more fully we can create more powerful functionality in our apps.
img: mountain.jpg
alt: understanding vue directives
---

## What is a directive?

So what is a directive in Vue? At the core, <mark>a directive is a "prefixed HTML attribute that tells the library to do something to a DOM element.</mark>[\*](https://012.vuejs.org/guide/directives.html)

In plain English, it is a piece of code that we use to tell Vue to do something with our markup. A couple of the most used directives in Vue are the _`v-bind`_ and the _`v-on`_ directives.

You'll notice we mentioned in the highlighted text that in Vue a directive must be prefixed. The default prefix for directives is the letter 'v' followed by the directive name/id.

## Parts of a directive

### Expression

Directives can take in a value. Take this code for example:

```
<div v-text="message"></div>
```

Here we are using the _`v-text`_ directive. The expression we are using is _`message`_, which is referring to a property on the Vue instance.

In addition to binding to just a single value, directives can take in an expression.

```
<div v-text="'hello ' + user.firstName + ' ' + user.lastName"></div>
```

In the above code, we have passed in an entire string that depends on multiple properties of the Vue instance. Whenever one of those properties changes, the text will be updated. To prevent using too much logic inside of directive expressions, we are limited to using **one statement** only. That might seem like an annoyance, but realistically we have better ways of handling complex logic, like computed properties.

### Argument

Arguments in Vue directives are ways we can adjust the functionality of a particular directive. An argument is passed to a directive after the `:`. For example, with the _`v-on`_ directive we pass an argument telling Vue which event to listen to. Eg: _`v-on:click`_.

### Modifiers

Directives can also have modifiers to add more functionality changes. Again as an example, we can add the _`stop`_ modifier to the _`v-on`_ directive to stop event propagation. Vue has other built in modifiers that can be really helpful. Some of the more helpful ones are on the _`keyup`_ event. See below for an example.

```
<input v-on:keyup.enter="submit">
```

The above code listens to the keyup event, but only on the 'Enter' key. This makes things really easy to use and prevents the developer from needing to write their own logic to handle this common problem.

See [this page of the documentation](https://vuejs.org/v2/guide/events.html#Event-Modifiers) for more information about event modifiers.
